const tomlify = require('tomlify-j0.4');
const toml = require('toml');

export const Util = {
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