import {connect} from 'react-redux'
import {AppAction} from "../Store";
import {default as Modal, ModalEvent, ModalInputType} from "./Modal";
import {closeModal, openModal} from "./Modules";

export class ModalActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {
  }
  open(title: string,
       msg: string,
       buttons?: Array<{name: string, listener?: (event: ModalEvent) => void}>,
       input?: Array<{name: string, type: ModalInputType}>) {
    this.dispatch(openModal(title, msg, buttons, input))
  }
  close() {
    this.dispatch(closeModal())
  }
}

export default connect(state => state.modal, dispatch => ({actions: new ModalActionDispatcher(dispatch)}))(Modal)