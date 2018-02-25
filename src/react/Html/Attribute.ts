export interface NinElementAttribute {
  name: string
  type: AttributeTypes
  value: string
  isRequired: boolean
}

export interface AttributeInfo {
  name: string
  type: AttributeTypes
  isRequired: boolean
}

export enum AttributeTypes {
  any = "any",
  string = "string",
  HTMLInput = "HTMLInpit",
  HTMLString = "HTMLString",
  script = "script",
  css = "css",
  int = "int",
  float = "float",
  array = "array",
}

export const AttrHTMLInput = ["text", "password", "checkbox", "radio", "file", "hidden", "submit", "reset", "button", "image"];
