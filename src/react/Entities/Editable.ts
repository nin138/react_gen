import {List, Map} from "immutable"
export class Editable {
  attributes: List<NinElementAttribute>;
  hasCss: boolean;
  classList: List<string>;
  // listeners: todo
  custom: Map<String, NinElementAttribute>;
  constructor(initializer: EditableInitializer, classList: Array<string>) {
    this.attributes = List(initializer.attributes);
    this.hasCss = initializer.hasCss;
    this.custom = Map(initializer.custom);
    this.classList = List(classList);
  }
  private copy(...differ: Array<object>): Editable {
    return Object.assign(Object.create(Editable.prototype), this, ...differ);
  }
  addClass(name: string): Editable {
    if(this.hasCss) return this.copy({classList: this.classList!!.push(name)});
    else throw new Error("ADD CSS to hasCss = false node");
  }
  removeClass(className: string): Editable {
    return this.copy({ classList: this.classList!!.remove(this.classList!!.indexOf(className))});
  }
  changeAttribute(attr: string, value: string) {
    return this.copy({ attributes: this.attributes.map(it => (it!.name === attr)? Object.assign(it, {value}): it) });
  }
}

export interface EditableInitializer {
  attributes: Array<NinElementAttribute>
  hasCss: boolean
  custom: Map<String, NinElementAttribute>
}

export interface NinElementAttribute {
  name: string
  type: EditableContentType
  value: any
}

export enum EditableContentType {
  any = "any",
  script = "script",
  css = "css",
  int = "int",
  float = "float",
  array = "array",
  html_string = "html_string",
  string = "string",
}