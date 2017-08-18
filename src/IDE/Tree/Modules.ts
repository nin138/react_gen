import {Action} from 'redux'
import {List} from "immutable"
import {ComponentRoot, componentRoot, NinComponent, NinComponentInitializer} from "../../Entities/NinComponent";

enum ActionNames {
  CreateNode = "Tree.CreateNode",
  CreateRoot = "Tree.CreateRoot",
}

interface CreateNodeAction extends Action {
  type: ActionNames.CreateNode
  initializer: NinComponentInitializer
  parent: NinComponent | ComponentRoot
}
export const createNode = (initializer: NinComponentInitializer, parent: NinComponent): CreateNodeAction => ({
  type: ActionNames.CreateNode,
  initializer,
  parent
});

interface CreateRootAction extends Action {
  type: ActionNames.CreateRoot
  initializer: NinComponentInitializer
}
export const createRoot= (initializer: NinComponentInitializer): CreateRootAction => ({
  type: ActionNames.CreateRoot,
  initializer,
});



export interface TreeState {
  node: List<NinComponent>
  rootNode: NinComponent | null
}

export type TreeAction = CreateNodeAction
    | CreateRootAction

const initialState: TreeState= {
  node: List(),
  rootNode: null
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.CreateNode:
      const parentIndex = state.node.findIndex(v => v == action.parent);
      const newNode = new NinComponent(action.initializer, action.parent);
      const node = state.node.update(parentIndex, v => v.addChild(newNode));
      return Object.assign({}, state, { node: node.push(newNode) });
    case ActionNames.CreateRoot:
      const root = new NinComponent(action.initializer, componentRoot);
      return Object.assign({}, state, { rootNode: root, node: state.node.push(root) });
    default:
      return state
  }
}