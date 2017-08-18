import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from 'react-redux'
import {Dispatch} from 'redux'
import {GeneralAction, GeneralState} from "../../Store";
import {addNode, TreeState} from "./Modules";
import Tree from "./Tree";
import store from "../../Store"

export class ActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void) {}
  addNode(tag: string) {
    console.log(store.getState());
    this.dispatch(addNode(tag, "2"))
  }
}

const mapStateToProps: MapStateToPropsParam<{value: TreeState}, any> =
    (state: GeneralState) => {
      return {value: state.tree}
    };

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}> =
    (dispatch: Dispatch<GeneralAction>) => ({actions: new ActionDispatcher(dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Tree)