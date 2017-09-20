export const Util = {
  camelToChain: (str: string): string => {
    return str.replace(/([A-Z])/g,
        (s) => {
          return '-' + s.charAt(0).toLowerCase();
        }
    );
  }
};