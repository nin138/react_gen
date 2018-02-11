import {ModalEvent, ModalInputType} from "./Modal";

enum ActionNames {
  open = "Modal.open",
  close = "Modal.close",
}

interface OpenModalAction {
  type: ActionNames.open
  title: string
  msg: string
  buttons?: Array<{name: string, listener?: (event: ModalEvent) => void}>
  input?: Array<{name: string, type: ModalInputType}>
}
export const openModal = (title: string,
                          msg: string,
                          buttons?: Array<{name: string, listener?: (event: ModalEvent) => void}>,
                          input?: Array<{name: string, type: ModalInputType}>): OpenModalAction => ({
  type: ActionNames.open,
  title,
  msg,
  buttons,
  input
});

interface CloseModalAction {
  type: ActionNames.close
}
export const closeModal = (): CloseModalAction => ({
  type: ActionNames.close
});

export interface ModalState {
  isOpen: boolean
  title?: string
  msg?: string
  buttons?: Array<{name: string, listener?: (event: ModalEvent) => void}>
  input?: Array<{name: string, type: ModalInputType}>
}

export type ModalAction = OpenModalAction
    | CloseModalAction

const initialState: ModalState= {
  isOpen: false
};

export default function reducer(state: ModalState = initialState, action: ModalAction): ModalState {
  switch (action.type) {
    case ActionNames.open:
      return Object.assign({}, state, { isOpen: true, title: action.title, msg: action.msg, buttons: action.buttons, input: action.input });
    case ActionNames.close:
      return Object.assign({}, state, { isOpen: false });
    default:
      return state
  }
}