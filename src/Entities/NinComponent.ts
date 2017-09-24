import {List, Map} from "immutable";
import {Editable, EditableInitializer} from "./Editable";

declare function require(name: string): any
const shortId = require("shortid");

export class NinComponent {
  static ROOT_ID = "root";
  readonly path: string;
  readonly name: string;
  readonly isInline: boolean;
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
    this.isInline = initializer.isInline;
    this.isFrame = initializer.isFrame;
    this.allowChild = initializer.allowChild;
    this.parent = parent;
    this.id = id;
    this.row = initializer.row;
    this.editable = new Editable(initializer.editable);
  }
  copy(...obj: Array<object>): NinComponent { return Object.assign(Object.create(NinComponent.prototype), this, ...obj) }
  addChild(childId: string, ref: string | null = null): NinComponent {
    return this.copy({ children: (!ref)? this.children.push(childId) : this.children.insert(this.children.indexOf(ref), childId) });
  }
  removeChild(id: string): NinComponent { return this.copy({ children: this.children.filter( value => value !== id) }) }
  changeParent(id: string): NinComponent { return this.copy({ parent: id }) }
  addCssClass(name: string): NinComponent { return this.copy({ editable: this.editable.addClass(name) }) }
  removeCssClass(className:string): NinComponent { return this.copy( { editable: this.editable.removeClass(className) }) }
  changeAttribute(attr: string, value: string): NinComponent { return this.copy({ editable: this.editable.changeAttribute(attr, value)}) }
}

export const root = (): NinComponent=> {
  return new NinComponent({
    path: "Project.Body",
    name: "root",
    isInline: false,
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
  isInline: boolean
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