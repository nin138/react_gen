import {Action} from 'redux'
import {List} from "immutable"
import NinComponent, {NinComponentInitializer} from "../../Entities/NinComponent";

enum ActionNames {
  AddNode = "Tree.AddNode"
}

interface AddNodeAction extends Action {
  type: ActionNames.AddNode
  initializer: NinComponentInitializer
  id: string
}
export const addNode = (initializer: NinComponentInitializer, id: string): AddNodeAction => ({
  type: ActionNames.AddNode,
  initializer,
  id
});

export class Node {
  tag: string;
  id: string;
  constructor(tag: string, id: string) {
    this.tag = tag;
    this.id = id;
  }
}

export interface TreeState {
  node: List<NinComponent>
}

export type TreeAction = AddNodeAction

const initialState: TreeState= {
  node: List()
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.AddNode:
      return Object.assign({}, state, { node: state.node.push(new NinComponent(action.initializer)) });
    default:
      return state
  }
}