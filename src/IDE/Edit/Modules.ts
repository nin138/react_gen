import {Action} from 'redux'

enum ActionNames {
  ChangeSelectedTab = "Edit.ChangeSelectedTab",
  ChangeCssAttr = "Edit.CssAttrChange",
}

interface ChangeSelectedTabAction extends Action {
  type: ActionNames.ChangeSelectedTab,
  tab: EditTabs
}
export const changeSelectedTab = (tab: EditTabs): ChangeSelectedTabAction => ({
  type: ActionNames.ChangeSelectedTab,
  tab
});

interface ChangeCssAttrAction extends Action {
  type: ActionNames.ChangeCssAttr
  attr: string
  value: string
}
export const changeCssAttr = (attr: string, value: string): ChangeCssAttrAction => ({
  type: ActionNames.ChangeCssAttr,
  attr,
  value,
});


export interface EditState {
  selectedTab: EditTabs
}

export type EditAction = ChangeCssAttrAction
    | ChangeSelectedTabAction

export enum EditTabs {
  Attributes, CSS, Custom, Listeners
}

const initialState: EditState= {
  selectedTab: EditTabs.CSS
};

export default function reducer(state: EditState = initialState, action: EditAction): EditState {
  switch (action.type) {
    case ActionNames.ChangeCssAttr:
      return Object.assign({}, state, { attr: action.attr, value: action.value });
    case ActionNames.ChangeSelectedTab:
      return Object.assign({}, state, { selectedTab: action.tab});
    default:
      return state
  }
}