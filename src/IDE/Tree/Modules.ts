import {Action} from 'redux'
import {List} from "immutable"

enum ActionNames {
  AddNode = "Tree.AddNode"
}

interface AddNodeAction extends Action {
  type: ActionNames.AddNode
  tag: string
}
export const addNode = (tag: string): AddNodeAction => ({
  type: ActionNames.AddNode,
  tag
});

export class Node {
  constructor(tag: string) {
    this.tag = tag;
  }
  tag: string
}

export interface TreeState {
  node: List<Node>
}

export type TreeAction = AddNodeAction

const initialState: TreeState= {
  node: List()
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.AddNode:
      return Object.assign({}, state, { node: state.node.push(new Node(action.tag)) });
    default:
      return state
  }
}