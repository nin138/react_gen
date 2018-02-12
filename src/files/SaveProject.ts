import {ComponentFile} from "../react/IDE/Project/Modules";
import {NinElement} from "../react/Entities/NinComponent";
import {Map} from "immutable"
import {Toml} from "../Util";

export interface SavedNode {
  type: string,
  id: string,
  parent: string,
  children: Array<string>,
  className: Array<string>,
  attribute: {[key: string]: string}
}

export interface SavedFile {
  name: string
  props: {[key: string]: string}
  state: {[key: string]: string}
  store: {[key: string]: string}
  initialStore: {[key: string]: string}
  actions: {[key: string]: string}
  reducer: {[key: string]: string}
  node: Array<SavedNode>
}

export const createComponentFile = (file: ComponentFile): string => {
  const getNodeArray = (nodes: Map<string, NinElement>): Array<SavedNode> => {
    return nodes.toArray().map(it => ({
      type: `${it.path}.${it.type}`,
      id: it.id,
      parent: it.id,
      children: it.children.toArray(),
      className: it.editable.classList.toArray(),
      attribute: {}// todo
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