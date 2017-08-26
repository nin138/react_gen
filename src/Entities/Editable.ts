import {Map} from "immutable"
import Css from "../Css/Css";
export class Editable {
  css: CSS|undefined;
  // listeners: todo
  custom: Map<String, EditableContent>
}

export interface EditableInitializer {
  css: Css|undefined
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