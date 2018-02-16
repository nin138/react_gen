import {NinComponentInitializer} from "../Entities/NinComponent";
import {CssClassManager} from "../Css/CssClassManager";
import Css from "../Css/Css";
import {SavedCss} from "../../files/FileManager";

enum ActionNames {
  addComponent = "IDE.AddComponent",
  createCssClass = "IDE.CreateCssClass",
  changeCss ="IDE.ChangeCss",
  loadSavedCss = "IDE.LoadSavedCss",
}

interface AddComponentAction {
  type: ActionNames.addComponent
  initializers: Array<NinComponentInitializer>
}
export const addComponentToManager = (...initializers: Array<NinComponentInitializer>) => ({
  type: ActionNames.addComponent,
  initializers
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

interface LoadSavedCssAction {
  type: ActionNames.loadSavedCss,
  savedCss: SavedCss
}
export const loadSavedCss = (savedCss: SavedCss): LoadSavedCssAction => ({
  type: ActionNames.loadSavedCss,
  savedCss
});

export interface IDEState {
  cssClassManager: CssClassManager
}

export type IDEAction = AddComponentAction
    | AddCssClassAction
    | ChangeCssAction
    | LoadSavedCssAction

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
    case ActionNames.loadSavedCss:
      return Object.assign({}, state, { cssClassManager: state.cssClassManager.loadSavedCss(action.savedCss)});
    default:
      return state
  }
}