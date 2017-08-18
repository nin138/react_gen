import NinComponent from "../Entities/NinComponent";
import {Map} from "immutable"

export const HTML_TAGS = Map({
  section: {
    inline: false,
    allowChild: true,
  },
  div: {
    inline: false,
    allowChild: true,
  },
  p: {
    inline: false,
    allowChild: true,
  },
});

export const HTML_PATH = "std.HTML";
export default function getHtmlClass(tag: string) {
  return new NinHTMLElement(tag)
}

class NinHTMLElement extends NinComponent {
  constructor(tag: string) {
    super();
    this.path = HTML_PATH;
    this.name = tag;
    this.isFrame = false;
    this.allowChild = HTML_TAGS.get(tag).allowChild;
    this.isInline = HTML_TAGS.get(tag).inline;
  }
}