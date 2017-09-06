import {Map} from "immutable"
import {EditableContent, EditableContentType} from "../Entities/Editable";
import {NinComponentInitializer, NinComponentString} from "../Entities/NinComponent";

const list = [
  {
    name: "section",
    inline: false,
    allowChild: true,
  }, {
    name: "div",
    inline: false,
    allowChild: true,
  }, {
    name: "p",
    inline: false,
    allowChild: true,
  },
];

export const HTML_PATH = "std.HTML";

const textNode: NinComponentInitializer = {
  path: HTML_PATH,
  name: "textNode",
  isInline: true,
  isFrame: false,
  allowChild: false,
  row: NinComponentString.Text,
  editable: {hasCss: false, custom: Map({text: {name: "text", type: EditableContentType.html_string, value: ""}})}
};

export const HTML_TAGS = list.map(v => { return {
  path: HTML_PATH,
  name: v.name,
  isFrame: false,
  isInline: v.inline,
  allowChild: v.allowChild,
  row: `<${v.name}>${NinComponentString.Children}</${v.name}>`,
  editable: { hasCss: true, custom: Map<String, EditableContent>() }
}});
HTML_TAGS.push(textNode);


