import {connect} from 'react-redux'
import {AppAction} from "../Store";
import IDE from "./IDE";
import {TreeActionDispatcher} from "./Tree/Tree";
import {EditActionDispatcher} from "./Edit/Edit";
import {LogActionDispatcher} from "./Log/Log";
import {ProjectActionDispatcher} from "./Project/ProjectTree";
import {
  addCssClassToComponent,loadProject,
  removeCssFromComponent
} from "./Project/Modules";
import {ModalActionDispatcher} from "../Modal/Container";
import {SavedFile} from "../../files/SaveProject";
import {SavedCss, SavedIndex} from "../../files/FileManager";

export class ActionDispatcher {
  tree: TreeActionDispatcher;
  edit: EditActionDispatcher;
  log: LogActionDispatcher;
  project: ProjectActionDispatcher;
  modal: ModalActionDispatcher;
  constructor(private dispatch: (action: AppAction) => void) {
    this.tree = new TreeActionDispatcher(dispatch);
    this.edit = new EditActionDispatcher(dispatch);
    this.log = new LogActionDispatcher(dispatch);
    this.project = new ProjectActionDispatcher(dispatch);
    this.modal = new ModalActionDispatcher(dispatch);
  }
  addCssClassToComponent(id: string, className: string) {
    this.dispatch(addCssClassToComponent(id, className))
  }
  removeCssFromComponent(componentId: string, className: string) {
    this.dispatch(removeCssFromComponent(componentId, className))
  }
  loadProject(index: SavedIndex, files: Array<SavedFile>, css: SavedCss) {
    this.tree.reloadTreeState();
    this.dispatch(loadProject(index, files, css));
  }
}

export default connect(state => state, dispatch => ({actions: new ActionDispatcher(dispatch)}))(IDE)