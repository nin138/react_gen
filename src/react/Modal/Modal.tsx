import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModalActionDispatcher } from "./Container";
import { ModalState } from "./Modules";

export interface ModalEvent {
  [key: string]: any;
}
export enum ModalInputType {
  TextBox
}
//
interface Props extends ModalState {
  actions: ModalActionDispatcher;
}

export default class Modal extends React.Component<Props> {
  onItemClick(listener?: (event: ModalEvent) => void) {
    const ev: any = {};
    if (this.props.input) {
      this.props.input.forEach(
        it =>
          (ev[it.name] = (ReactDOM.findDOMNode(
            this.refs[it.name]
          ) as HTMLInputElement).value)
      );
    }
    if (listener) listener(ev);
    this.props.actions.close();
  }
  render() {
    if (!this.props.isOpen) return <div />;
    const inputs = this.props.input
      ? this.props.input.map(it => (
          <div className="c-modal__main__input-wrap">
            {it.name}:<input
              className="c-modal__main__input--text"
              key={it.name}
              type="text"
              ref={it.name}
            />
          </div>
        ))
      : "";
    const buttons = this.props.buttons
      ? this.props.buttons.map(it => (
          <button
            className="c-modal__main__button"
            key={it.name}
            onClick={() => this.onItemClick.bind(this, it.listener)()}
          >
            {it.name}
          </button>
        ))
      : "";
    return (
      <section className="c-modal">
        <div className="c-modal__main">
          <h1 className="c-modal__main__title">{this.props.title}</h1>
          <p className="c-modal__main__message">{this.props.msg}</p>
          <div className="c-modal__main__input-area">{inputs}</div>
          <div className="c-modal__main__button-wrap">{buttons}</div>
          <div
            className="c-modal__close-btn"
            onClick={e => this.props.actions.close()}
          >
            ✖
          </div>
        </div>
      </section>
    );
  }
}
