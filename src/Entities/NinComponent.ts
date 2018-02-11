import {List, Map} from "immutable";
import {Editable, EditableContent, EditableInitializer} from "./Editable";

declare function require(name: string): any
const shortId = require("shortid");

export class NinElement {
  static ROOT_ID = "root";
  readonly path: string;
  readonly type: string;
  readonly isFrame: boolean;
  readonly allowChild: boolean;
  readonly parent: string;
  readonly children: List<string> = List();
  readonly id: string;
  readonly editable: Editable;
  readonly row: string;
  constructor(initializer: NinComponentInitializer, parent: string, id: string = shortId.generate()) {
    this.path = initializer.path;
    this.type = initializer.type;
    this.isFrame = initializer.isFrame;
    this.allowChild = initializer.allowChild;
    this.parent = parent;
    this.id = id;
    this.row = initializer.row;
    this.editable = new Editable(initializer.editable);
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
      custom: Map<String, EditableContent>()
    }
  }
};