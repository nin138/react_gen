import * as React from 'react'
import {Editable, EditableContent, EditableContentType} from "../../../Entities/Editable";

interface Props {
  id: string
  editable: Editable
  changeAttribute: (id: string, attr: string, value: string) => void
}

export default class AttributeEditor extends React.Component<Props> {
  private createAttributeInput(id: string, content: EditableContent) {
    const createInput = (value: string, type: EditableContentType, onChange: (value: string) => void, cssAttr?: string) => {
      switch(type) {
        case EditableContentType.string: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.html_string: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.array: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.float: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.int: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.script: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.any: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.css: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>); // todo use CssEditor
      }};
    const action = (value: string) => { this.props.changeAttribute(id, content.name, value) };
    return (
        <div key={content.name}>
          <p>{content.name}</p>
          {createInput(content.value, content.type, action,content.cssAttr)}
        </div>
    );
  }
  render() {
    return (
        <div>
          {this.props.editable.attributes.keySeq().toArray()
              .map(v => this.createAttributeInput(this.props.id, this.props.editable.attributes.get(v)))
          }
        </div>
    );
  }
}
