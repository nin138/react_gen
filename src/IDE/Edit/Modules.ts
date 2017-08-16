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
  attr: string
  value: string
}

export type EditAction = ChangeCssAttrAction

const initialState: EditState= {
  attr: "i",
  value: "t"
};

export default function reducer(state: EditState = initialState, action: EditAction): EditState {
  switch (action.type) {
    case ActionNames.ChangeCssAttr:
      return Object.assign({}, state, { attr: action.attr, value: action.value });
    default:
      return state
  }
}