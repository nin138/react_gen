import * as React from 'react'
import {AttributeInfo, AttributeTypes} from "../../../Html/Attribute";
import {NinElement} from "../../../Entities/NinComponent";
import {Project} from "../../Project/Project";

interface Props {
  element: NinElement
  changeAttribute: (id: string, attr: string, value: string) => void
  project: Project
}

export default class AttributeEditor extends React.Component<Props> {
  private createAttributeInput(attr: string) {
    const info = this.props.project.getComponentInitializer(this.props.element.fullName())
      .attributes.find(it => it.name === attr)!;
    const createInput = (value: string, info: AttributeInfo, onChange: (value: string) => void) => {
      switch(info.type) {
        case AttributeTypes.string: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.HTMLString: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.SELECT: return (
          <select onChange={ (e) => onChange(e.target.value) }>
            {["", ...info.select!].map(opt => <option selected={value === opt} value={opt}>{opt}</option>)}
          </select>);
        case AttributeTypes.array: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.float: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.int: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.script: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.any: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.css: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>); // todo use CssEditor
      }};
    const action = (value: string) => { this.props.changeAttribute(this.props.element.id, attr, value) };
    return (
        <div key={attr}>
          <p>{attr}</p>
          {createInput(this.props.element.attributes.find(it => it!.name === attr).value, info!, action)}
        </div>
    );
  }
  render() {
    return (
        <div>
          {this.props.element.attributes
              .map(it => this.createAttributeInput(it!.name))
          }
        </div>
    );
  }
}
