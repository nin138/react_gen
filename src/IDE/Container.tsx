import {connect} from 'react-redux'
import {AppAction} from "../Store";
import IDE from "./IDE";
import {TreeActionDispatcher} from "./Tree/Tree";
import {EditActionDispatcher} from "./Edit/Edit";
import {PaletteActionDispatcher} from "./Palette/Palette";
import {addComponent} from "./Modules";

export class ActionDispatcher {
  tree: TreeActionDispatcher;
  edit: EditActionDispatcher;
  palette: PaletteActionDispatcher;
  constructor(private dispatch: (action: AppAction) => void) {
    this.tree = new TreeActionDispatcher(dispatch);
    this.edit = new EditActionDispatcher(dispatch);
    this.palette = new PaletteActionDispatcher(dispatch);
  }
  addComponent() {
    this.dispatch(addComponent({} as any))// todo
  }
}

export default connect(state => state, dispatch => ({actions: new ActionDispatcher(dispatch)}))(IDE)