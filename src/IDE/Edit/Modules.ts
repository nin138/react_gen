import {Action} from 'redux'

enum ActionNames {
  ChangeCssAttr = "Edit.CssAttrChange",
}

interface ChangeCssAttrAction extends Action {
  type: ActionNames.ChangeCssAttr
  attr: string
  value: string
}
export const changeCssAttr = (attr: string, value: string): ChangeCssAttrAction => ({
  type: ActionNames.ChangeCssAttr,
  attr: attr,
  value: value
});

export interface EditState {
  selectedTab: EditTabs
}

export type EditAction = ChangeCssAttrAction

export enum EditTabs {
  CSS, Custom, Listeners
}

const initialState: EditState= {
  selectedTab: EditTabs.CSS
};

export default function reducer(state: EditState = initialState, action: EditAction): EditState {
  switch (action.type) {
    case ActionNames.ChangeCssAttr:
      return Object.assign({}, state, { attr: action.attr, value: action.value });
    default:
      return state
  }
}