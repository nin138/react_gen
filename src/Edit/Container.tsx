import Edit from './Edit'
import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from 'react-redux'
import {Dispatch} from 'redux'
import {GeneralAction, GeneralState} from "../Store";
import {changeCssAttr, EditState} from "./Modules";

export class ActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void) {}

  public changeCss(attr: string, value: string) {
    this.dispatch(changeCssAttr(attr, value))
  }
}

const mapStateToProps: MapStateToPropsParam<{value: EditState}, any> =
    (state: GeneralState) => {
      return {value: state.edit}
    };

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}> =
    (dispatch: Dispatch<GeneralAction>) => ({actions: new ActionDispatcher(dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Edit)