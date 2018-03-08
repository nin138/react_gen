import {AttributeInfo, AttributeTypes} from "./react/Html/Attribute";
import {NinComponentInfo} from "./react/Entities/NinElement";
import {Map} from "immutable";

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
  attrToString: (info: AttributeInfo, value: string): string => {
    if(info.isRequired == true && value == "") throw new Error(`attribute "${info.name}" is required but has no value`);
    const getValue = (attr: string, type: AttributeTypes) => {
      switch (type) {
        case AttributeTypes.string: return `"${value}"`;
        case AttributeTypes.HTMLString: return `"${Util.escapeHTMLString(value)}"`;
        case AttributeTypes.script: return `{${value}}`;
        default: return `"${value}"`;
      }
    };
    return `${info.name}=${getValue(value, info.type)}`;
  },
  getAttrStr: (attrs: Map<string, string>, componentInfo: NinComponentInfo): string => {
    attrs.keySeq().toArray().map(attr => {
      const info = componentInfo.attributes.find(it => it.name == attr);
      if(info == undefined) throw new Error(`this component does not have attr ${attr}`);
      return NodeUtil.attrToString(info, attrs.get(attr));
    });
    return attrs.join(" ");
  },
  // getAttrsStrFromNinElement: (node: NinElement) => {// to renderer
  //   let attrs = node.attributes.toArray().map(it => {
  //     //todo when required = true but value is ""
  //     return `${NodeUtil.attrToString(it)}`;
  //   });
  //   if(node.classList.size != 0) attrs = attrs.concat(`class="${node.classList.join(" ")}"`);
  //   return (attrs.length == 0)? "" : " " + attrs.join(" ");
  // },
  // getAttrsStrFromSavedNode: (node: SavedNode) => { // to transpiler
  //   //todo when required = true but value is ""
  //   let attrs = node.attribute.map(it =>
  //     `${it.name}=${NodeUtil.attrToString(it)}`
  //   );
  //   if(node.className.length != 0) attrs = attrs.concat(`className="${node.className.join(" ")}"`);
  //   return (attrs.length == 0)?  "" :" " + attrs.join(" ");
  // }
};


