import {ComponentManager, initial} from "../Html/ComponentManager";
import {NinComponentInitializer} from "../Entities/NinComponent";
import {CssClassManager} from "../Css/CssClassManager";

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
  componentManager: ComponentManager
  cssClassManager: CssClassManager
}

export type IDEAction = AddComponentAction

const initialState: IDEState= {
  componentManager: initial,
  cssClassManager: new CssClassManager()
};

export default function reducer(state: IDEState = initialState, action: IDEAction): IDEState {
  switch (action.type) {
    case ActionNames.addComponent:
      return Object.assign({}, state, { componentManager: state.componentManager.set(action.initializer) });
    default:
      return state
  }
}