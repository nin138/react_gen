import {connect} from 'react-redux'
import {GeneralAction} from "../Store";
import IDE from "./IDE";
import {addNode} from "./Tree/Modules";
import {TreeActionDispatcher} from "./Tree/Tree";
import {EditActionDispatcher} from "./Edit/Edit";
import {PaletteActionDispatcher} from "./Palette/Palette";

export class ActionDispatcher {
  tree: TreeActionDispatcher;
  edit: EditActionDispatcher;
  palette: PaletteActionDispatcher;
  constructor(private dispatch: (action: GeneralAction) => void) {
    this.tree = new TreeActionDispatcher(dispatch);
    this.edit = new EditActionDispatcher(dispatch);
    this.palette = new PaletteActionDispatcher(dispatch);
  }
  test() { this.dispatch(addNode("", "")) }
}

export default connect(state => state, dispatch => ({actions: new ActionDispatcher(dispatch)}))(IDE)