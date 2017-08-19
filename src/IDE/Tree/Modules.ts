import {Action} from 'redux'
import {Map} from "immutable"
import {NinComponent} from "../../Entities/NinComponent";

enum ActionNames {
  CreateNode = "Tree.CreateNode",
  CreateRoot = "Tree.CreateRoot",
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

interface CreateRootAction extends Action {
  type: ActionNames.CreateRoot
  node: NinComponent
}
export const createRoot= (node: NinComponent): CreateRootAction => ({
  type: ActionNames.CreateRoot,
  node,
});



export interface TreeState {
  node: Map<string,NinComponent>
  rootNodeId: string | null
}

export type TreeAction = CreateNodeAction
    | CreateRootAction

const initialState: TreeState= {
  node: Map(),
  rootNodeId: null
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.CreateNode:
      const node = state.node.set(action.parent, state.node.get(action.parent).addChild(action.node.id));
      return Object.assign({}, state, { node: node.set(action.node.id, action.node) });
    case ActionNames.CreateRoot:
      return Object.assign({}, state, { rootNodeId: action.node.id, node: state.node.set(action.node.id, action.node) });
    default:
      return state
  }
}