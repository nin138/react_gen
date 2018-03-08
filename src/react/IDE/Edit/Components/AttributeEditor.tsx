import * as React from 'react'
import {AttributeInfo, AttributeTypes} from "../../../Html/Attribute";
import {NinElement} from "../../../Entities/NinElement";
import {Project} from "../../Project/Project";

interface Props {
  element: NinElement
  changeAttribute: (id: string, attr: string, value: string) => void
  project: Project
}

export default class AttributeEditor extends React.Component<Props> {
  private createAttributeInput(info: AttributeInfo) {
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
        case AttributeTypes.CSSLength: return "todo";
        case AttributeTypes.boolean: return (<input type="checkbox" checked={value === "true"} onChange={e => onChange(e.target.checked? "true" : "false")}/>)
        case AttributeTypes.HTMLid: return <input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>;// todo
        case AttributeTypes.URI: return <input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>;// todo
        case AttributeTypes.imageURI: return <input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>;// todo

        default: throw new Error("todo impl AttributeEditor" + info.type);
      }};
    const action = (value: string) => { this.props.changeAttribute(this.props.element.id, info.name, value) };
    return (
        <div key={info.name}>
          <p>{info.name}</p>
          {createInput(this.props.element.attributes.get(info.name), info, action)}
        </div>
    );
  }
  render() {
    return (
        <div>
          {this.props.project.getComponentInfo(this.props.element.fullName()).attributes
            .map(it => this.createAttributeInput(it))}
        </div>
    );
  }
}
