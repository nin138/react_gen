import { connect } from "react-redux";
import { AppAction, AppState } from "../Store";
import { default as Modal } from "./Modal";
import { closeModal, ModalInfo, openModal } from "./Modules";

export class ModalActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  open(info: ModalInfo) {
    this.dispatch(openModal(info));
  }
  close() {
    this.dispatch(closeModal());
  }
}
const mapStateToProps = (state: AppState) => state.modal;

export default connect(mapStateToProps, dispatch => ({
  actions: new ModalActionDispatcher(dispatch)
}))(Modal);
