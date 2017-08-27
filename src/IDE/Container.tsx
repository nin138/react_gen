import {connect} from 'react-redux'
import {AppAction} from "../Store";
import IDE from "./IDE";
import {TreeActionDispatcher} from "./Tree/Tree";
import {EditActionDispatcher} from "./Edit/Edit";
import {PaletteActionDispatcher} from "./Palette/Palette";
import {addComponent, changeCss, createCssClass} from "./Modules";
import {LogActionDispatcher} from "./Log/Log";
import Css from "../Css/Css";
import {addCssClassToComponent} from "./Tree/Modules";

export class ActionDispatcher {
  tree: TreeActionDispatcher;
  edit: EditActionDispatcher;
  palette: PaletteActionDispatcher;
  log: LogActionDispatcher;
  constructor(private dispatch: (action: AppAction) => void) {
    this.tree = new TreeActionDispatcher(dispatch);
    this.edit = new EditActionDispatcher(dispatch);
    this.palette = new PaletteActionDispatcher(dispatch);
    this.log = new LogActionDispatcher(dispatch);
  }
  addComponent() {
    this.dispatch(addComponent({} as any))// todo
  }
  createCssClass(name: string) {
    this.dispatch(createCssClass(name, new Css()))
  }
  changeCss(name: string, attr: string, value: string) {
    this.dispatch(changeCss(name, attr, value)) // todo err handle
  }
  addCssClassToComponent(id: string, className: string) {
    this.dispatch(addCssClassToComponent(id, className))
  }
}

export default connect(state => state, dispatch => ({actions: new ActionDispatcher(dispatch)}))(IDE)