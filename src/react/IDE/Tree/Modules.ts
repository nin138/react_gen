import {ROOT_ID} from "../../Entities/NinElement";

export enum TreeItemPosition {
  before = "before",
  body = "body",
  after = "after",
}

enum ActionNames {
  changeSelectedItem = "Tree.ChangeSelectedItem",
  openContextMenu = "Tree.changeContextMenu",
  reload = "Tree.reload",
}


interface ChangeSelectedItemAction {
  type: ActionNames.changeSelectedItem
  id: string
}
export const changeSelectedItem = (id: string): ChangeSelectedItemAction => ({
  type: ActionNames.changeSelectedItem,
  id
});


interface OpenContextMenuAction {
  type: ActionNames.openContextMenu,
  id: string | null
}
export const openContextMenu = (id: string | null): OpenContextMenuAction => ({
  type: ActionNames.openContextMenu,
  id
});

interface ReloadAction {
  type: ActionNames.reload,
}
export const reloadTreeState = (): ReloadAction => ({
  type: ActionNames.reload
});


export interface TreeState {
  selectedItemId: string
  contextMenuId: string | null
}

export type TreeAction =
    | ChangeSelectedItemAction
    | OpenContextMenuAction
    | ReloadAction


const initialState: TreeState= {
  selectedItemId: ROOT_ID,
  contextMenuId: null
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {
    case ActionNames.changeSelectedItem:
      return Object.assign({}, state, { selectedItemId: action.id });
    case ActionNames.openContextMenu:
      return Object.assign({}, state, { contextMenuId: action.id });
    case ActionNames.reload:
      return Object.assign({}, initialState)
    default: { return state }
  }
}