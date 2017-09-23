export const Util = {
  camelToChain: (str: string): string => {
    return str.replace(/([A-Z])/g,
        (s) => {
          return '-' + s.charAt(0).toLowerCase();
        }
    );
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
};