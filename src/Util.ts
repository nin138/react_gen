import {SavedAttribute, SavedNode} from "./files/SaveProject";
import {AttributeTypes, NinElementAttribute} from "./react/Html/Attribute";
import {NinElement} from "./react/Entities/NinComponent";

const tomlify = require('tomlify-j0.4');
const toml = require('toml');
const shortId = require("shortid");

export const Util = {
  generateId: (): string => {
    return shortId.generate();
  },
  camelToChain: (str: string): string => {
    return str.replace(/([A-Z])/g,
        (s) => '-' + s.charAt(0).toLowerCase());
  },
  capitalizeFirst: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  escapeHTMLString: (str: string): string => {
    return str.replace(/[&'`"<>]/g, (match) => {
      switch(match) {
        case "&": return "&amp;";
        case "'": return "&#x27;";
        case "`": return "&#x60;";
        case '"': return "&quot;";
        case "<": return "&lt;";
        case ">": return "&gt;";
        default: return match;
      }
    });
  },
  // when `enum xx { a = "sss" }` doesn't work
  enumToKeyArray: (enumObj: any): Array<string> => {
    return Object.keys(enumObj).filter(v => typeof v === "string");
  },
};

export const Toml = {
  parse: (str: string): any => {
    return toml.parse(str);
  },
  stringify: (obj: any): string => {
    return tomlify.toToml(obj);
  }
};

export const NodeUtil = {
  getPathFromFullName: (fullName: string): string => {
    return fullName.split(".").slice(0, -1).join(".");
  },
  attrToString: (attr: SavedAttribute | NinElementAttribute): string => {
    const getValue = (attr: SavedAttribute | NinElementAttribute) => {
      switch (attr.type) {
        case AttributeTypes.string: return `"${attr.value}"`;
        default: return `{${attr.value}`
      }
    };
    return `${attr.name}=${getValue(attr)}`;
  },
  getAttrsStrFromNinElement: (node: NinElement) => {// to renderer
    let attrs = node.attributes.toArray().map(it => {
      //todo when required = true but value is ""
      return `${it.name}=${NodeUtil.attrToString(it)}`;
    });
    if(node.classList.size != 0) attrs = attrs.concat(`class="${node.classList.join(" ")}"`);
    return " " + attrs.join(" ");
  },
  getAttrsStrFromSavedNode: (node: SavedNode) => { // to transpiler
    //todo when required = true but value is ""
    let attrs = node.attribute.map(it =>
      `${it.name}=${NodeUtil.attrToString(it)}`
    );
    if(node.className.length != 0) attrs = attrs.concat(`className="${node.className.join(" ")}"`);
    return " " + attrs.join(" ");
  }
};


