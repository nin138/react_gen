import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from 'react-redux'
import {Dispatch} from 'redux'
import {GeneralAction, GeneralState} from "../../Store";
import Palette from "./Palette";
import {PaletteState} from "./Modules";
import {addNode} from "../Tree/Modules";

export class ActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void) {}
  itemDropped(target: string) { console.log(target);this.dispatch(addNode("div")) }
}

const mapStateToProps: MapStateToPropsParam<{value: PaletteState}, any> =
    (state: GeneralState) => {
      return {value: state.palette}
    };

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}> =
    (dispatch: Dispatch<GeneralAction>) => ({actions: new ActionDispatcher(dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Palette)