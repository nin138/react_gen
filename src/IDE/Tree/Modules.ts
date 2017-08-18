import {Action} from 'redux'
import {List} from "immutable"
import NinComponent, {NinComponentInitializer} from "../../Entities/NinComponent";

enum ActionNames {
  CreateNode = "Tree.CreateNode"
}

interface AddNodeAction extends Action {
  type: ActionNames.CreateNode
  initializer: NinComponentInitializer
  parent: NinComponent
}
export const createNode = (initializer: NinComponentInitializer, parent: NinComponent): AddNodeAction => ({
  type: ActionNames.CreateNode,
  initializer,
  parent
});



export interface TreeState {
  node: List<NinComponent>
}

export type TreeAction = AddNodeAction

const initialState: TreeState= {
  node: List()
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.CreateNode:
      return Object.assign({}, state, { node: state.node.push(new NinComponent(action.initializer, action.parent)) });
    default:
      return state
  }
}