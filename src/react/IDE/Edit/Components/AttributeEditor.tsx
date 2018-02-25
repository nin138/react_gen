import * as React from 'react'
import {AttributeTypes, NinElementAttribute} from "../../../Html/Attribute";
import {NinElement} from "../../../Entities/NinComponent";

interface Props {
  id: string
  node: NinElement
  changeAttribute: (id: string, attr: string, value: string) => void
}

export default class AttributeEditor extends React.Component<Props> {
  private createAttributeInput(id: string, content: NinElementAttribute) {
    const createInput = (value: string, type: AttributeTypes, onChange: (value: string) => void) => {
      switch(type) {
        case AttributeTypes.string: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.HTMLString: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.HTMLInput: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.array: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.float: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.int: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.script: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.any: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case AttributeTypes.css: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>); // todo use CssEditor
      }};
    const action = (value: string) => { this.props.changeAttribute(id, content.name, value) };
    return (
        <div key={content.name}>
          <p>{content.name}</p>
          {createInput(content.value, content.type, action)}
        </div>
    );
  }
  render() {
    return (
        <div>
          {this.props.node.attributes
              .map(it => this.createAttributeInput(this.props.id, it!))
          }
        </div>
    );
  }
}
