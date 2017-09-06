import {List, Map} from "immutable"
export class Editable {
  hasCss: boolean;
  classList?: List<string>;
  // listeners: todo
  custom: Map<String, EditableContent>;
  constructor(initializer: EditableInitializer, classList?: List<string>) {
    this.hasCss = initializer.hasCss;
    this.custom = Map(initializer.custom);
    this.classList = classList || (this.hasCss)? List() : undefined;
  }
  private copy(...differ: Array<object>): Editable {
    return Object.assign(Object.create(Editable.prototype), this, ...differ);
  }
  addClass(name: string): Editable {
    if(this.hasCss) return this.copy({classList: this.classList!!.push(name)});
    else throw new Error("ADD CSS to hasCss = false node");
  }
}

export interface EditableInitializer {
  hasCss: boolean
  custom: Map<String, EditableContent>
}

export interface EditableContent {
  name: string
  type: EditableContentType
  cssAttr?: string|undefined // when EditableContentType is css
  value: any
}

export enum EditableContentType {
  any, script, css, int, float, array, html_string,
}