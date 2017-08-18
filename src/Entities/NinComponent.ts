import {List} from "immutable";

declare function require(name: string): any
const shortId = require('shortid');

export type NinComponentType = NinComponent | ComponentRoot

export class NinComponent {
  path: string;
  name: string;
  isInline: boolean;
  isFrame: boolean;
  allowChild: boolean;
  fullName() { return `${this.path}.${this.name}` }
  parent: NinComponent | ComponentRoot;
  children: List<NinComponent> = List();
  id: string;
  constructor(initializer: NinComponentInitializer, parent: NinComponent | ComponentRoot, id: string = shortId.generate()) {
    this.path = initializer.path;
    this.name = initializer.name;
    this.isInline = initializer.isInline;
    this.isFrame = initializer.isFrame;
    this.allowChild = initializer.allowChild;
    this.parent = parent;
    this.id = id;
  }
  copy(...obj: Array<object>): NinComponent {
    return Object.assign(Object.create(NinComponent.prototype), this, ...obj)
  }
  addChild(child: NinComponent): NinComponent {
    return this.copy({children: this.children.push(child)})
  }
}

export class ComponentRoot {
  id = "root";
  name = "root";
  allowChild = true;
  children: List<NinComponent> = List();
  copy(...obj: Array<object>): ComponentRoot {
    return Object.assign(Object.create(ComponentRoot.prototype), this, ...obj)
  }
  addChild(child: NinComponent): ComponentRoot {
    return this.copy({children: this.children.push(child)})
  }
}
export const componentRoot = new ComponentRoot();

export interface NinComponentInitializer {
  path: string;
  name: string;
  isInline: boolean;
  isFrame: boolean;
  allowChild: boolean;
}