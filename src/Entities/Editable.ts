import {List, Map} from "immutable"
export interface Editable {
  hasCss: boolean
  classList?: List<string>
  // listeners: todo
  custom: Map<String, EditableContent>
}

export interface EditableInitializer {
  hasCss: boolean
  custom: Map<String, EditableContent>
}

export interface EditableContent {
  name: string
  type: EditableContentType
  cssAttr: string|undefined // when EditableContentType is css
  value: any
}

export enum EditableContentType {
  any, script, css, int, float, array, html_string,
}