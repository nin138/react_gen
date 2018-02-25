import {NinElement} from "../react/Entities/NinComponent";
import {Map} from "immutable"
import {Toml} from "../Util";
import {AttributeTypes, NinElementAttribute} from "../react/Html/Attribute";
import {ComponentFile} from "../react/IDE/Project/ComponentFile";

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
  type: AttributeTypes
  value: string
}

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
    return node.attributes.toArray()
  };

  const getNodeArray = (nodes: Map<string, NinElement>): Array<SavedNode> => {
    return nodes.toArray().map(it => ({
      type: `${it.path}.${it.type}`,
      id: it.id,
      parent: it.parent,
      children: it.children.toArray(),
      className: it.classList.toArray(),
      attribute: getAttrArrayFromNinElement(it)
    }))
  };
  return Toml.stringify({
    name: file.name,
    props: {}, // todo
    state: {}, //todo
    store: {}, //todo
    initialStore: {}, //todo
    actions: {}, //todo
    reducer: {}, //todo
    node: getNodeArray(file.elements)
  });
};