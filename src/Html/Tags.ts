import {List, Map} from "immutable"
import {EditableContent} from "../Entities/Editable";
import {NinComponentString} from "../Entities/NinComponent";

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

export const HTML_TAGS = list.map(v => { return {
  path: HTML_PATH,
  name: v.name,
  isFrame: false,
  isInline: v.inline,
  allowChild: v.allowChild,
  row: `<${v.name}>${NinComponentString.Children}</${v.name}>`,
  editable: { hasCss: true, classList: List<string>(), custom: Map<String, EditableContent>() }
}});


