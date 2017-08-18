declare function require(name: string): any
const shortId = require('shortid');

export default class NinComponent {
  path: string;
  name: string;
  isInline: boolean;
  isFrame: boolean;
  allowChild: boolean;
  fullName() { return `${this.path}.${this.name}` }
  parent: NinComponent;
  id: string;
  constructor(initializer: NinComponentInitializer, parent: NinComponent, id: string = shortId.generate()) {
    this.path = initializer.path;
    this.name = initializer.name;
    this.isInline = initializer.isInline;
    this.isFrame = initializer.isFrame;
    this.allowChild = initializer.allowChild;
    this.parent = parent;
    this.id = id;
  }
}

export interface NinComponentInitializer {
  path: string;
  name: string;
  isInline: boolean;
  isFrame: boolean;
  allowChild: boolean;
}