import { Map } from "immutable";
import { NinElement } from "../react/Entities/NinElement";
import { ComponentFile } from "../react/IDE/Project/ComponentFile";
import { Toml } from "../Util";

export interface SavedNode {
  type: string;
  id: string;
  parent: string;
  children: string[];
  className: string[];
  attribute: SavedAttribute[];
}

export interface SavedAttribute {
  attr: string;
  value: string;
}

export interface SavedFile {
  path: string;
  name: string;
  props: { [key: string]: string };
  state: { [key: string]: string };
  store: { [key: string]: string };
  initialStore: { [key: string]: string };
  actions: { [action: string]: { [param: string]: string } };
  reducer: { [key: string]: string };
  node: SavedNode[];
}

export const createComponentFile = (file: ComponentFile): string => {
  const getAttrArrayFromNinElement = (
    node: NinElement
  ): Array<{ attr: string; value: string }> => {
    return node.attributes
      .keySeq()
      .toArray()
      .map(it => ({ attr: it, value: node.attributes.get(it) }))
      .filter(it => it.value !== "");
  };

  const getNodeArray = (nodes: Map<string, NinElement>): SavedNode[] => {
    return nodes.toArray().map(it => ({
      type: `${it.path}.${it.type}`,
      id: it.id,
      parent: it.parent,
      children: it.children.toArray(),
      className: it.classList.toArray(),
      attribute: getAttrArrayFromNinElement(it)
    }));
  };
  return Toml.stringify({
    name: file.name,
    props: {}, // todo
    state: {}, // todo
    store: {}, // todo
    initialStore: {}, // todo
    actions: {}, // todo
    reducer: {}, // todo
    node: getNodeArray(file.elements)
  });
};
