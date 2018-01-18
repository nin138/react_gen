import {connect} from 'react-redux'
import {AppAction} from "../Store";
import Top from "./Top";
import {Map} from "immutable"
import {ComponentFile, loadProject} from "../IDE/Project/Modules";

export class ActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {
  }
  loadProject(prjName: string, files: Map<string, ComponentFile>, root: string) {
    this.dispatch(loadProject(prjName, files, root));
  }
}

export default connect(state => state, dispatch => ({actions: new ActionDispatcher(dispatch)}))(Top)