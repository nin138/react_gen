import {ComponentManager, initial} from "../Html/ComponentManager";
import {NinComponentInitializer} from "../Entities/NinComponent";

enum ActionNames {
  addComponent = "IDE.addComponent"
}

interface AddComponentAction {
  type: ActionNames.addComponent
  initializer: NinComponentInitializer
}
export const addComponent = (initializer: NinComponentInitializer) =>
  ({ type: ActionNames.addComponent, initializer });

export interface IDEState {
  componentManage: ComponentManager
}

export type IDEAction = AddComponentAction

const initialState: IDEState= {
  componentManage: initial
};

export default function reducer(state: IDEState = initialState, action: IDEAction): IDEState {
  switch (action.type) {
    case ActionNames.addComponent:
      return Object.assign({}, state, { componentManager: state.componentManage.set(action.initializer) });
    default:
      return state
  }
}