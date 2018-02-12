import {NinComponentInitializer} from "../Entities/NinComponent";
import {CssClassManager} from "../Css/CssClassManager";
import Css from "../Css/Css";

enum ActionNames {
  addComponent = "IDE.AddComponent",
  createCssClass = "IDE.CreateCssClass",
  changeCss ="IDE.ChangeCss",
}

interface AddComponentAction {
  type: ActionNames.addComponent
  initializer: NinComponentInitializer
}
export const addComponentToManager = (initializer: NinComponentInitializer) => ({
  type: ActionNames.addComponent,
  initializer
});

interface AddCssClassAction {
  type: ActionNames.createCssClass
  name: string
  css: Css
}
export const createCssClass = (name: string, css: Css): AddCssClassAction => ({
  type: ActionNames.createCssClass,
  name,
  css
});

interface ChangeCssAction {
  type: ActionNames.changeCss
  className: string
  attr: string
  value: string
}
export const changeCss = (className: string, attr: string, value: string): ChangeCssAction => ({
  type: ActionNames.changeCss,
  className,
  attr,
  value
});

export interface IDEState {
  cssClassManager: CssClassManager
}

export type IDEAction = AddComponentAction
    | AddCssClassAction
    | ChangeCssAction

const initialState: IDEState= {
  cssClassManager: new CssClassManager()
};

export default function reducer(state: IDEState = initialState, action: IDEAction): IDEState {
  switch (action.type) {
    case ActionNames.createCssClass:
      if(state.cssClassManager.getCss(action.name)) return state;
      return Object.assign({}, state, { cssClassManager: state.cssClassManager.add(action.name, action.css) });
    case ActionNames.changeCss:
      return Object.assign({}, state, { cssClassManager: state.cssClassManager.updateAttr(action.className, action.attr, action.value)});
    default:
      return state
  }
}