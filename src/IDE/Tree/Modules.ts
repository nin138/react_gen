import {Action} from 'redux'

export enum TreeItemPosition {
  before = "before",
  body = "body",
  after = "after",
}

enum ActionNames {
  ChangeSelectedItem = "Tree.ChangeSelectedItem",
}



interface ChangeSelectedItemAction extends Action {
  type: ActionNames.ChangeSelectedItem
  id: string
}
export const changeSelectedItem = (id: string): ChangeSelectedItemAction => ({
  type: ActionNames.ChangeSelectedItem,
  id
});


export interface TreeState {
  selectedItemId: string
}

export type TreeAction =
    | ChangeSelectedItemAction

const initialState: TreeState= {
  selectedItemId: "root"
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {

    case ActionNames.ChangeSelectedItem:
      return Object.assign({}, state, { selectedItemId: action.id });
    default: { return state }
  }
}