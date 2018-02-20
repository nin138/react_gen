import {ComponentFile} from "../react/IDE/Project/Project";
import {NinElement} from "../react/Entities/NinComponent";
import {Map} from "immutable"
import {Toml} from "../Util";
import {EditableContentType, NinElementAttribute} from "../react/Entities/Editable";

export interface SavedNode {
  type: string,
  id: string,
  parent: string,
  children: Array<string>,
  className: Array<string>,
  attribute: Array<SavedAttribute>
}

export interface SavedAttribute {
  name: string
  type: EditableContentType
  value: string
}

export const getAttrFromSavedNode = (attr: string, node: SavedNode): SavedAttribute|undefined => {
  return node.attribute.find(it => it.name === attr);
};

export interface SavedFile {
  path: string
  name: string
  props: {[key: string]: string}
  state: {[key: string]: string}
  store: {[key: string]: string}
  initialStore: {[key: string]: string}
  actions: {[action: string]: {[param: string]: string}}
  reducer: {[key: string]: string}
  node: Array<SavedNode>
}

export const createComponentFile = (file: ComponentFile): string => {
  const getAttrArrayFromNinElement = (node: NinElement): Array<NinElementAttribute> => {
    return node.editable.attributes.toArray()
  };

  const getNodeArray = (nodes: Map<string, NinElement>): Array<SavedNode> => {
    return nodes.toArray().map(it => ({
      type: `${it.path}.${it.type}`,
      id: it.id,
      parent: it.parent,
      children: it.children.toArray(),
      className: it.editable.classList.toArray(),
      attribute: getAttrArrayFromNinElement(it)
    }))
  };
  return Toml.stringify({
    name: file.fullName.split(".").pop(),
    props: {}, // todo
    state: {}, //todo
    store: {}, //todo
    initialStore: {}, //todo
    actions: {}, //todo
    reducer: {}, //todo
    node: getNodeArray(file.elements)
  });
};