import { List, Map } from "immutable";
import {
  NinComponentInfo,
  NinElement,
  ROOT_ID
} from "../../Entities/NinElement";
import { Project } from "./Project";

export interface StateData {
  name: string;
  initial: string;
  type: string;
}

export interface NinAction {
  name: string;
  prams: Map<string, string>;
}

export interface NinReducerCase {
  actionName: string;
  fn: string;
}

export class ComponentFile {
  readonly props: List<{ name: string; type: string }>; // todo
  readonly store: List<StateData>; // todo
  readonly state: List<StateData>; // todo
  readonly actions: List<NinAction>; // todo
  readonly dispatcher: any; // todo
  readonly reducer: List<NinReducerCase>; // todo
  readonly path: string;
  readonly name: string;
  readonly row: string | undefined;
  readonly elements: Map<string, NinElement>;

  constructor(fullName: string, elements: Map<string, NinElement> = Map()) {
    const path = fullName.split(".");
    this.name = path.pop()!;
    this.path = path.join(".");
    this.elements = elements;

    this.props = List();
    this.store = List();
    this.state = List();
    this.actions = List();
    this.reducer = List();
  }

  fullName(): string {
    return this.path + "." + this.name;
  }

  getComponentInitializer(): NinComponentInfo {
    return {
      path: this.path,
      type: this.name,
      hasChild: false,
      hasCss: false,
      attributes: []
    };
  }

  rebuildTree(
    project: Project,
    list: Array<{
      parent: string;
      fullName: string;
      id: string;
      children: string[];
    }>
  ) {
    const newElements: { [key: string]: NinElement } = {};
    list.forEach(it => {
      const oldElement = this.elements.get(it.id);
      newElements[it.id] = oldElement
        ? oldElement.copy({ children: List(it.children), parent: it.parent })
        : new NinElement(
            project.getComponentInfo(it.fullName),
            it.parent,
            it.children,
            undefined,
            undefined,
            it.id
          );
    });
    return this.copy({ elements: Map(newElements) });
  }
  addNode(element: NinElement): ComponentFile {
    if (element.parent == ROOT_ID) {
      return this.copy({ elements: this.elements.set(element.id, element) });
    }
    return this.copy({
      elements: this.elements
        .set(element.id, element)
        .update(element.parent, it => it.addChild(element.id))
    });
  }
  removeNode(id: string): ComponentFile {
    let ret = this.elements;
    ret =
      ret.get(id).parent !== ROOT_ID
        ? ret.update(ret.get(id).parent, it => it.removeChild(id))
        : ret;
    const remove = (id: string) => {
      const children = this.elements.get(id).children;
      children.forEach(it => {
        remove(it!);
      });
      ret = ret.delete(id);
    };
    remove(id);
    return this.copy({ elements: ret });
  }
  moveNode(
    moveNodeId: string,
    parentId: string,
    ref: string | null
  ): ComponentFile {
    const moveNode = this.elements.get(moveNodeId);
    const oldParentId = moveNode.parent;
    if (moveNode.id === parentId) return this;
    let newElements = this.elements.update(moveNode.id, v =>
      v.changeParent(parentId)
    );
    if (parentId !== ROOT_ID) {
      newElements = newElements.update(parentId, v =>
        v.addChild(moveNode.id, ref)
      );
    }
    if (oldParentId !== ROOT_ID) {
      newElements = newElements.update(oldParentId, v =>
        v.removeChild(moveNode.id)
      );
    }
    return this.copy({ elements: newElements });
  }
  addCssClassToNode(id: string, className: string): ComponentFile {
    return this.copy({
      elements: this.elements.update(id, it => it.addCssClass(className))
    });
  }
  removeCssClassFromNode(id: string, className: string): ComponentFile {
    return this.copy({
      elements: this.elements.update(id, it => it.removeCssClass(className))
    });
  }
  changeAttribute(id: string, attr: string, value: string): ComponentFile {
    return this.copy({
      elements: this.elements.update(id, it => {
        return it.changeAttribute(attr, value);
      })
    });
  }
  copyNodes(id: string): Map<string, NinElement> {
    let ret = Map<string, NinElement>();
    const get = (id: string) => {
      this.elements.get(id).children.forEach(it => get(it!));
      ret = ret.set(id, this.elements.get(id));
    };
    get(id);
    return ret;
  }
  private copy(...differ: object[]): ComponentFile {
    return Object.assign(
      Object.create(ComponentFile.prototype),
      this,
      ...differ
    );
  }
}
