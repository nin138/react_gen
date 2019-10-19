export interface NinElementAttribute {
  name: string;
  type: AttributeTypes;
  value: string;
  isRequired: boolean;
}

export interface AttributeInfo {
  name: string;
  type: AttributeTypes;
  isRequired: boolean;
  select?: string[];
}

export enum AttributeTypes {
  boolean = "boolean",
  HTMLid = "HTMLid",
  any = "any",
  string = "string",
  HTMLString = "HTMLString",
  SELECT = "SELECT",
  script = "script",
  css = "css",
  int = "int",
  float = "float",
  array = "array",
  URI = "URI",
  CSSLength = "CSSLength",
  imageURI = "imageURI"
}
