import * as React from 'react'

interface Props {
  title: string
  msg: string

  positiveButton: string
  positiveButtonListener: (obj: any) => void
  negativeButton: string
  negativeButtonListener: (obj: any) => void
  textBox: boolean
}

export default class Modal extends React.Component<Props> {
  render() {
  }
}


export enum AlertButtons {
  OK_CANCEL,
  YES_NO,
  YES_NO_CANCEL,
}
export class Alert {
  private title_;
  private message_;
  private input_ = [];
  private button_ = {
    type: null, values: []
  };
  private listener;
  private checkbox_ = [];
  constructor() {
  }
  title(value) {
    this.title_ = value;
    return this;
  }
  message(value) {
    this.message_ = value;
    return this;
  }
  button(type: AlertButtons, values?: string[]) {
    this.button_.type = type;
    if(values) this.button_.values = values;
    else AlertButtons[type].split("_").forEach((v)=> { this.button_.values.push(v) });
    return this;
  }
  input(label: string ,default_value? : string) {
    this.input_.push({ label: label, value: default_value || "" });
    return this;
  }
  checkbox(label: string, default_value?: boolean) {
    this.checkbox_.push({ label: label, value: default_value || false });
    return this;
  }
  callback(fn: (type: string,input?: Object, checkbox?: Object ) => void) {
    this.listener = fn;
    return this;
  }
  create() {
    return new AlertView(this.title_, this.message_, this.button_, this.input_, this.checkbox_, this.listener);
  }
}

class AlertView {
  private wrap: HTMLElement;
  private element: HTMLElement;
  private input = {};
  private checkbox = {};
  private callback: (type: string,input?: Object, checkbox?: Object )=> void;
  constructor(title, message, button, input, checkbox, listener) {
    const set_close = (el,v) => {  el.addEventListener('click', ()=> this.close(v)); };
    this.callback = listener;
    this.wrap = Util.create_element('div', 'alert-wrap', null, document.body);
    this.element = Util.create_element('div', 'alert-modal', null, document.body);
    if(button.values && button.type != AlertButtons.YES_NO) {
      const close_btn = Util.create_element('span', 'close-btn', '×', this.element);
      set_close(close_btn, 'CANCEL');
      set_close(this.wrap, 'CANCEL');
    }
    if(title) Util.create_element('h1', 'alert-title', title , this.element);
    const sc_area = Util.create_element('div', 'alert-scroll-area', null, this.element);
    if(message) Util.create_element('p', 'alert-msg', message, sc_area);
    //input
    input.forEach((v)=> {
      const wrap = Util.create_element('label', 'alert-input-wrap', null, sc_area);
      const input = Util.create_element('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', v.value);
      wrap.appendChild(input);
      Util.create_element('span', null, v.label, wrap);
      this.input[v.label] = input;
    });
    //checkbox
    checkbox.forEach((v)=> {
      const wrap = Util.create_element('label', 'alert-check-label', null, sc_area);
      const checkbox = <HTMLInputElement>Util.create_element('input', null, null, wrap);
        checkbox.setAttribute('type', 'checkbox');
        if(v.value) button.checked = true;
        const span = Util.create_element('span', null, v.label, wrap);
        this.checkbox[v.label] = checkbox;
        });
        //button
        if(button.values) {
          const wrap = Util.create_element('div', 'alert-btn-area');
          this.element.appendChild(wrap);
          button.values.forEach((v, i)=> {
          const button = Util.create_element('button', "alert-btn-" + i, v, wrap);
          set_close(button, v);
        });
        }
        }
        show() {
          this.wrap.style.display = 'block';
          setTimeout(()=> {this.element.style.transform = 'scale(1,1)';}, 1);
        }
        close(type) {
          let input = {};
          let checkbox = {};
          for(let k in this.input) input[k] = this.input[k].value;
          for(let k in this.checkbox) checkbox[k] = this.checkbox[k].checked;
          if(this.callback) this.callback(type, input, checkbox);
          document.body.removeChild(this.wrap);
          document.body.removeChild(this.element);
        }
        }