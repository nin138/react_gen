import {List, Map} from "immutable";
import {Editable, EditableInitializer, NinElementAttribute} from "./Editable";
import {SavedAttribute, SavedNode} from "../../files/SaveProject";

declare function require(name: string): any
const shortId = require("shortid");

export class NinElement {
  readonly path: string;
  readonly type: string;
  readonly isFrame: boolean;
  readonly allowChild: boolean;
  readonly parent: string;
  readonly children: List<string> = List();
  readonly id: string;
  readonly editable: Editable;
  readonly row: string;
  static fromSavedNode(initializer: NinComponentInitializer, node: SavedNode): NinElement {
    console.log(node);
    return new NinElement(initializer, node.parent, node.children, node.className, node.attribute, node.id);
  }
  constructor(initializer: NinComponentInitializer, parent: string, children: Array<string> = [], classList: Array<string> = [], attrs: Array<SavedAttribute> = [], id: string = shortId.generate()) {
    this.path = initializer.path;
    this.type = initializer.type;
    this.isFrame = initializer.isFrame;
    this.allowChild = initializer.allowChild;
    this.parent = parent;
    this.children = List(children);
    this.id = id;
    this.row = initializer.row;
    this.editable = new Editable(initializer.editable, classList);
    this.editable.attributes = List(attrs);
  }
  copy(...obj: Array<object>): NinElement { return Object.assign(Object.create(NinElement.prototype), this, ...obj) }
  changeId(id: string): NinElement { return this.copy({id: id}) }
  addChild(childId: string, ref: string | null = null): NinElement {
    return this.copy({ children: (!ref)? this.children.push(childId) : this.children.insert(this.children.indexOf(ref), childId) });
  }
  removeChild(id: string): NinElement { return this.copy({ children: this.children.filter( value => value !== id) }) }
  changeParent(id: string): NinElement { return this.copy({ parent: id }) }
  addCssClass(name: string): NinElement { return this.copy({ editable: this.editable.addClass(name) }) }
  removeCssClass(className:string): NinElement { return this.copy( { editable: this.editable.removeClass(className) }) }
  changeAttribute(attr: string, value: string): NinElement { return this.copy({ editable: this.editable.changeAttribute(attr, value)}) }
}

export const ROOT_ID = "root";

export interface NinComponentInitializer {
  path: string
  type: string
  isFrame: boolean
  allowChild: boolean
  row: string //    /$*children*$/
  editable: EditableInitializer
}

export const NinComponentString = {
  ClassName: "<$*className*$>",
  Children: "<$*children*$>",
  Text: "<$*text*$>",
  Attributes: "<$*attributes*$>",
};

export const createNinComponentInitializer = (type: string, nodes: Map<string, NinElement>): NinComponentInitializer => {
  return {
    path: "components", //todo
    type: type,
    isFrame: false,
    allowChild: false,
    row: `<${type} ${NinComponentString.Attributes}></${type}>`,
    editable: {//todo
      attributes: [],
      hasCss: false,
      custom: Map<String, NinElementAttribute>()
    }
  }
};