import {List} from "immutable";

declare function require(name: string): any
const shortId = require('shortid');

export type NinComponentType = NinComponent | ComponentRoot

export class NinComponent {
  readonly path: string;
  readonly name: string;
  readonly isInline: boolean;
  readonly isFrame: boolean;
  readonly allowChild: boolean;
  fullName() { return `${this.path}.${this.name}` }
  readonly parent: string;
  readonly children: List<string> = List();
  readonly id: string;
  constructor(initializer: NinComponentInitializer, parent: string, id: string = shortId.generate()) {
    this.path = initializer.path;
    this.name = initializer.name;
    this.isInline = initializer.isInline;
    this.isFrame = initializer.isFrame;
    this.allowChild = initializer.allowChild;
    this.parent = parent;
    this.id = id;
  }
  copy(...obj: Array<object>): NinComponent { return Object.assign(Object.create(NinComponent.prototype), this, ...obj) }
  addChild(child: string, targetId?: string, after?: boolean,): NinComponent {
    let differ = {};
    if(targetId === undefined) differ = { children: this.children.push(child)};
    else {
      let index = this.children.indexOf(targetId);
      if(after) index++;
      differ = { children: this.children.insert(index, child) }
    }
    return this.copy(differ);
  }
  removeChild(id: string): NinComponent { return this.copy({ children: this.children.filter( value => value !== id) }) }
  changeParent(id: string): NinComponent { return this.copy({ parent: id }) }

}

export class ComponentRoot {
  id = "root";
  name = "root";
  allowChild = true;
  children: List<NinComponent> = List();
  copy(...obj: Array<object>): ComponentRoot { return Object.assign(Object.create(ComponentRoot.prototype), this, ...obj) }
  addChild(child: NinComponent): ComponentRoot { return this.copy({children: this.children.push(child)}) }
}
export const componentRoot = new ComponentRoot();

export interface NinComponentInitializer {
  path: string;
  name: string;
  isInline: boolean;
  isFrame: boolean;
  allowChild: boolean;
}