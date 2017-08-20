import {Action} from 'redux'
import {Map} from "immutable"
import {NinComponent} from "../../Entities/NinComponent";

export enum TreeItemPosition {
  before = "before",
  body = "body",
  after = "after",
}

enum ActionNames {
  CreateNode = "Tree.CreateNode",
  CreateRoot = "Tree.CreateRoot",
  MoveNode = "Tree.MoveNode",
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
export const createRoot = (node: NinComponent): CreateRootAction => ({
  type: ActionNames.CreateRoot,
  node,
});

interface MoveNodeAction extends Action {
  type: ActionNames.MoveNode
  id: string
  targetId: string
  position: TreeItemPosition
}
export const moveNode = (id: string, targetId: string, position: TreeItemPosition): MoveNodeAction => ({
  type: ActionNames.MoveNode,
  id,
  targetId,
  position,
});


export interface TreeState {
  node: Map<string,NinComponent>
  rootNodeId: string | null
}

export type TreeAction = CreateNodeAction
    | CreateRootAction
    | MoveNodeAction

const initialState: TreeState= {
  node: Map(),
  rootNodeId: null
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.CreateNode: {
      const node = state.node.set(action.parent, state.node.get(action.parent).addChild(action.node.id));
      return Object.assign({}, state, {node: node.set(action.node.id, action.node)});
    }
    case ActionNames.CreateRoot: {
      return Object.assign({}, state, {rootNodeId: action.node.id, node: state.node.set(action.node.id, action.node)});
    }
    case ActionNames.MoveNode: {
      const parentId = (action.position === TreeItemPosition.body)? action.targetId : state.node.get(action.targetId).parent;
      const target = (action.position === TreeItemPosition.body)? undefined : action.targetId;
      const after = (action.position === TreeItemPosition.after)? true : undefined;
      const moveNode = state.node.get(action.id);
      return Object.assign({}, state, { node: state.node
          .set(moveNode.parent, state.node.get(moveNode.parent).removeChild(moveNode.id))
          .set(moveNode.id, moveNode.changeParent(parentId))
          .set(parentId, state.node.get(parentId).addChild(moveNode.id, target, after))
      });
    }
    default:
      return state
  }
}