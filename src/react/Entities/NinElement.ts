import { List, Map } from "immutable";
import { SavedNode } from "../../files/SaveProject";
import { Util } from "../../Util";
import { AttributeInfo } from "../Html/Attribute";

export class NinElement {
  readonly path: string;
  readonly type: string;
  fullName = () => `${this.path}.${this.type}`;
  readonly parent: string;
  readonly children: List<string> = List();
  readonly id: string;
  readonly classList: List<string>;
  readonly attributes: Map<string, string>;

  static fromSavedNode(
    initializer: NinComponentInfo,
    node: SavedNode
  ): NinElement {
    return new NinElement(
      initializer,
      node.parent,
      node.children,
      node.className,
      node.attribute,
      node.id
    );
  }
  constructor(
    initializer: NinComponentInfo,
    parent: string,
    children: string[] = [],
    classList: string[] = [],
    attrs: Array<{ attr: string; value: string }> = [],
    id: string = Util.generateId()
  ) {
    this.path = initializer.path;
    this.type = initializer.type;
    this.parent = parent;
    this.children = List(children);
    this.id = id;
    this.classList = List(classList);
    let map: Map<string, string> = Map();
    attrs.forEach(it => {
      map = map.set(it.attr, it.value);
    });
    this.attributes = map;
  }
  copy(...obj: object[]): NinElement {
    return Object.assign(Object.create(NinElement.prototype), this, ...obj);
  }
  addChild(childId: string, ref: string | null = null): NinElement {
    return this.copy({
      children: !ref
        ? this.children.push(childId)
        : this.children.insert(this.children.indexOf(ref), childId)
    });
  }
  removeChild(id: string): NinElement {
    return this.copy({ children: this.children.filter(value => value !== id) });
  }
  changeParent(id: string): NinElement {
    return this.copy({ parent: id });
  }
  addCssClass(className: string): NinElement {
    return this.copy({ classList: this.classList.push(className) });
  }
  removeCssClass(className: string): NinElement {
    return this.copy({
      classList: this.classList.filter(it => it !== className)
    });
  }
  changeAttribute(attr: string, value: string): NinElement {
    return this.copy({ attributes: this.attributes.update(attr, _ => value) });
  }
}

export const ROOT_ID = "root";

export interface NinComponentInfo {
  path: string;
  type: string;
  hasChild: boolean;
  attributes: AttributeInfo[];
  hasCss: boolean;
}

export const NinComponentString = {
  Children: "<$*children*$>",
  Text: "<$*text*$>",
  Attributes: "<$*attributes*$>"
};
