import {Action} from 'redux'
import {Map} from "immutable"
import {NinComponent, root} from "../../Entities/NinComponent";

export enum TreeItemPosition {
  before = "before",
  body = "body",
  after = "after",
}

enum ActionNames {
  CreateNode = "Tree.CreateNode",
  MoveNode = "Tree.MoveNode",
  ChangeSelectedItem = "Tree.ChangeSelectedItem",
  AddCssClassToComponent = "Tree.AddCssClassToComponent",
  ChangeAttribute = "Tree.ChangeAttribute",
  RemoveCssFromComponent = "Tree.RemoveCssFromComponent"
}

interface CreateNodeAction extends Action {
  type: ActionNames.CreateNode
  node: NinComponent
  parent: string
}
export const createNode = (node: NinComponent, parent: string): CreateNodeAction => ({
  type: ActionNames.CreateNode,
  node,
  parent
});

interface MoveNodeAction extends Action {
  type: ActionNames.MoveNode
  moveNodeId: string
  parentId: string
  ref: string | null
}
export const moveNode = (moveNodeId: string, parentId: string, ref: string | null): MoveNodeAction => ({
  type: ActionNames.MoveNode,
  moveNodeId,
  parentId,
  ref
});

interface ChangeSelectedItemAction extends Action {
  type: ActionNames.ChangeSelectedItem
  id: string
}
export const changeSelectedItem = (id: string): ChangeSelectedItemAction => ({
  type: ActionNames.ChangeSelectedItem,
  id
});

interface AddCssClassToComponentAction {
  type: ActionNames.AddCssClassToComponent
  id: string
  className: string
}
export const addCssClassToComponent = (id: string, className: string): AddCssClassToComponentAction => ({
  type: ActionNames.AddCssClassToComponent,
  id,
  className,
});

interface ChangeAttributeAction extends Action {
  type: ActionNames.ChangeAttribute,
  targetId: string,
  attr: string,
  value: string,
}
export const changeAttribute = (targetId: string, attr: string, value: string): ChangeAttributeAction => ({
  type: ActionNames.ChangeAttribute,
  targetId,
  attr,
  value
});

interface RemoveCssFromComponentAction {
  type: ActionNames.RemoveCssFromComponent
  componentId: string
  className: string
}
export const removeCssFromComponent = (componentId: string, className: string): RemoveCssFromComponentAction => ({
  type: ActionNames.RemoveCssFromComponent,
  componentId,
  className,
});

export interface TreeState {
  node: Map<string,NinComponent>
  selectedItemId: string
}

export type TreeAction =
    CreateNodeAction
    | MoveNodeAction
    | ChangeSelectedItemAction
    | AddCssClassToComponentAction
    | ChangeAttributeAction
    | RemoveCssFromComponentAction

const initialState: TreeState= {
  node: Map({root: root()}),
  selectedItemId: "root"
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.CreateNode: {
      const node = state.node.set(action.parent, state.node.get(action.parent).addChild(action.node.id));
      return Object.assign({}, state, {node: node.set(action.node.id, action.node)});
    }
    case ActionNames.MoveNode: {
      const moveNode = state.node.get(action.moveNodeId);
      const oldParentId = moveNode.parent;
      if(moveNode.id === action.parentId) return state;
      let newNodes = state.node
          .update(moveNode.id, v => v.changeParent(action.parentId))
          .update(oldParentId, v => v.removeChild(moveNode.id))
          .update(action.parentId, v => v.addChild(moveNode.id, action.ref));
      return Object.assign({}, state, { node: newNodes });
    }
    case ActionNames.ChangeSelectedItem:
      return Object.assign({}, state, { selectedItemId: action.id });
    case ActionNames.AddCssClassToComponent:
      return Object.assign({}, state, { node: state.node.update(action.id, v => v.addCssClass(action.className)) });
    case ActionNames.RemoveCssFromComponent:
      return Object.assign({}, state, { node: state.node.update(action.componentId, v => v.removeCssClass(action.className))});
    case ActionNames.ChangeAttribute:
      return Object.assign(
          {}, state,
          {node: state.node.update(action.targetId, v => v.changeAttribute(action.attr, action.value))});
    default: { return state }
  }
}