import {List, Map} from "immutable";
import {Editable, EditableInitializer} from "./Editable";

declare function require(name: string): any
const shortId = require("shortid");

export class NinElement {
  static ROOT_ID = "root";
  readonly path: string;
  readonly name: string;
  readonly isFrame: boolean;
  readonly allowChild: boolean;
  fullName() { return `${this.path}.${this.name}` }
  readonly parent: string;
  readonly children: List<string> = List();
  readonly id: string;
  readonly editable: Editable;
  readonly row: string;
  constructor(initializer: NinComponentInitializer, parent: string, id: string = shortId.generate()) {
    this.path = initializer.path;
    this.name = initializer.name;
    this.isFrame = initializer.isFrame;
    this.allowChild = initializer.allowChild;
    this.parent = parent;
    this.id = id;
    this.row = initializer.row;
    this.editable = new Editable(initializer.editable);
  }
  copy(...obj: Array<object>): NinElement { return Object.assign(Object.create(NinElement.prototype), this, ...obj) }
  addChild(childId: string, ref: string | null = null): NinElement {
    return this.copy({ children: (!ref)? this.children.push(childId) : this.children.insert(this.children.indexOf(ref), childId) });
  }
  removeChild(id: string): NinElement { return this.copy({ children: this.children.filter( value => value !== id) }) }
  changeParent(id: string): NinElement { return this.copy({ parent: id }) }
  addCssClass(name: string): NinElement { return this.copy({ editable: this.editable.addClass(name) }) }
  removeCssClass(className:string): NinElement { return this.copy( { editable: this.editable.removeClass(className) }) }
  changeAttribute(attr: string, value: string): NinElement { return this.copy({ editable: this.editable.changeAttribute(attr, value)}) }
}

export const createRoot = (): NinElement=> {
  return new NinElement({
    path: "Project.Body",
    name: "root",
    isFrame: false,
    allowChild: true,
    row: NinComponentString.Children,
    editable: {
      attributes: [],
      hasCss: false,
      custom: Map(),
    }
  }, "none", "root")
};

export interface NinComponentInitializer {
  path: string
  name: string
  isFrame: boolean
  allowChild: boolean
  row: string //    /$*children*$/
  editable: EditableInitializer
}

export const NinComponentString = {
  ClassName: "<$*className*$>",
  Children: "<$*children*$>",
  Text: "<$*text*$>",
};