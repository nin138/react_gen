import {connect} from 'react-redux'
import {AppAction} from "../Store";
import IDE from "./IDE";
import {TreeActionDispatcher} from "./Tree/Tree";
import {EditActionDispatcher} from "./Edit/Edit";
import {PaletteActionDispatcher} from "./Palette/Palette";
import {addComponentToManager, changeCss, createCssClass} from "./Modules";
import {LogActionDispatcher} from "./Log/Log";
import Css from "../Css/Css";
import {ProjectActionDispatcher} from "./Project/Project";
import {addCssClassToComponent, loadProject, removeCssFromComponent} from "./Project/Modules";
import {NinComponentInitializer} from "../Entities/NinComponent";
import {ModalActionDispatcher} from "../Modal/Container";
import {SavedFile} from "../../files/SaveProject";
import {SavedIndex} from "../../files/FileManager";

export class ActionDispatcher {
  tree: TreeActionDispatcher;
  edit: EditActionDispatcher;
  palette: PaletteActionDispatcher;
  log: LogActionDispatcher;
  project: ProjectActionDispatcher;
  modal: ModalActionDispatcher;
  constructor(private dispatch: (action: AppAction) => void) {
    this.tree = new TreeActionDispatcher(dispatch);
    this.edit = new EditActionDispatcher(dispatch);
    this.palette = new PaletteActionDispatcher(dispatch);
    this.log = new LogActionDispatcher(dispatch);
    this.project = new ProjectActionDispatcher(dispatch);
    this.modal = new ModalActionDispatcher(dispatch);
  }
  addComponentToManager(initializer: NinComponentInitializer) {
    this.dispatch(addComponentToManager(initializer))
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
  removeCssFromComponent(componentId: string, className: string) {
    this.dispatch(removeCssFromComponent(componentId, className))
  }
  loadProject(index: SavedIndex, files: Array<SavedFile>) {
    this.tree.reloadTreeState();
    this.dispatch(loadProject(index, files));
  }
}

export default connect(state => state, dispatch => ({actions: new ActionDispatcher(dispatch)}))(IDE)