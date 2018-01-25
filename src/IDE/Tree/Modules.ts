import {Action} from 'redux'

export enum TreeItemPosition {
  before = "before",
  body = "body",
  after = "after",
}

enum ActionNames {
  ChangeSelectedItem = "Tree.ChangeSelectedItem",
  AddCssClassToComponent = "Tree.AddCssClassToComponent",
  ChangeAttribute = "Tree.ChangeAttribute",
  RemoveCssFromComponent = "Tree.RemoveCssFromComponent"
}



interface ChangeSelectedItemAction extends Action {
  type: ActionNames.ChangeSelectedItem
  id: string
}
export const changeSelectedItem = (id: string): ChangeSelectedItemAction => ({
  type: ActionNames.ChangeSelectedItem,
  id
});

interface AddCssClassToComponentAction {
  type: ActionNames.AddCssClassToComponent
  id: string
  className: string
}
export const addCssClassToComponent = (id: string, className: string): AddCssClassToComponentAction => ({
  type: ActionNames.AddCssClassToComponent,
  id,
  className,
});

interface ChangeAttributeAction extends Action {
  type: ActionNames.ChangeAttribute,
  targetId: string,
  attr: string,
  value: string,
}
export const changeAttribute = (targetId: string, attr: string, value: string): ChangeAttributeAction => ({
  type: ActionNames.ChangeAttribute,
  targetId,
  attr,
  value
});

interface RemoveCssFromComponentAction {
  type: ActionNames.RemoveCssFromComponent
  componentId: string
  className: string
}
export const removeCssFromComponent = (componentId: string, className: string): RemoveCssFromComponentAction => ({
  type: ActionNames.RemoveCssFromComponent,
  componentId,
  className,
});

export interface TreeState {
  selectedItemId: string
}

export type TreeAction =
    | ChangeSelectedItemAction
    | AddCssClassToComponentAction
    | ChangeAttributeAction
    | RemoveCssFromComponentAction

const initialState: TreeState= {
  selectedItemId: "root"
};

export default function reducer(state: TreeState = initialState, action: TreeAction): TreeState {
  switch (action.type) {

    case ActionNames.ChangeSelectedItem:
      return Object.assign({}, state, { selectedItemId: action.id });
    // case ActionNames.AddCssClassToComponent:
    //   return Object.assign({}, state, { node: state.node.update(action.id, v => v.addCssClass(action.className)) });
    // case ActionNames.RemoveCssFromComponent:
    //   return Object.assign({}, state, { node: state.node.update(action.componentId, v => v.removeCssClass(action.className))});
    // case ActionNames.ChangeAttribute:
    //   return Object.assign(
    //       {}, state,
    //       {node: state.node.update(action.targetId, v => v.changeAttribute(action.attr, action.value))});
    default: { return state }
  }
}