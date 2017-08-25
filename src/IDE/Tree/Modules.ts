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
}

export type TreeAction = CreateNodeAction
    | CreateRootAction
    | MoveNodeAction

const initialState: TreeState= {
  node: Map({root: root()})
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.CreateNode: {
      console.log("createnode");
      const node = state.node.set(action.parent, state.node.get(action.parent).addChild(action.node.id));
      return Object.assign({}, state, {node: node.set(action.node.id, action.node)});
    }
    case ActionNames.CreateRoot: {
      console.log("createroot");
      return Object.assign({}, state, {rootNodeId: action.node.id, node: state.node.set(action.node.id, action.node)});
    }
    case ActionNames.MoveNode: {
      const parentId = (action.position === TreeItemPosition.body)? action.targetId : state.node.get(action.targetId).parent;
      const target = (action.position === TreeItemPosition.body)? undefined : action.targetId;
      const after = (action.position === TreeItemPosition.after)? true : undefined;
      const oldParentId = state.node.get(action.id).parent;
      let newNode = state.node
          .update(action.id, v => v.changeParent(parentId))
          .update(oldParentId, v => v.removeChild(action.id))
          .update(parentId, v=> v.addChild(action.id, target, after));
      return Object.assign({}, state, { node: newNode });
    }
    default: { return state }
  }
}