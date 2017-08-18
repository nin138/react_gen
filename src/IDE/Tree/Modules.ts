import {Action} from 'redux'
import {List} from "immutable"

enum ActionNames {
  AddNode = "Tree.AddNode"
}

interface AddNodeAction extends Action {
  type: ActionNames.AddNode
  tag: string
  id: string
}
export const addNode = (tag: string, id: string): AddNodeAction => ({
  type: ActionNames.AddNode,
  tag,
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
  node: List<Node>
}

export type TreeAction = AddNodeAction

const initialState: TreeState= {
  node: List()
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.AddNode:
      return Object.assign({}, state, { node: state.node.push(new Node(action.tag, action.id)) });
    default:
      return state
  }
}