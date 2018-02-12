import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ModalState} from "./Modules";
import {ModalActionDispatcher} from "./Container";

export type ModalEvent = { [key: string]: any }
export enum ModalInputType {
  TextBox,
}
//
interface Props extends ModalState {
  actions: ModalActionDispatcher
}

export default class Modal extends React.Component<Props> {
  onItemClick(listener?: (event: ModalEvent) => void) {
    const ev: any = {};
    if(this.props.input) {
      this.props.input.forEach(it => ev[it.name] = (ReactDOM.findDOMNode(this.refs[it.name]) as HTMLInputElement).value)
    }
    if(listener) listener(ev);
    this.props.actions.close();
  }
  render() {
    if(!this.props.isOpen) return (<div></div>);
    const inputs = (this.props.input)?this.props.input.map(it => <input key={it.name} type="text" ref={it.name}/>) : "";
    const buttons = (this.props.buttons)? this.props.buttons
        .map(it => <button key={it.name} onClick={() => this.onItemClick.bind(this, it.listener)()}>{it.name}</button>) : "";
    return(<section className="c-modal">
      <div className="c-modal__main">
        <h1>{this.props.title}</h1>
        <p>{this.props.msg}</p>
        {inputs}
        {buttons}
      </div>
    </section>)
  }
}
