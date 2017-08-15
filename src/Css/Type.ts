export enum CssValueTypes {
  Invalid, Void, Color, Len, Int, Float, ZeroToOne ,Other, Merge
}
export const COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenrod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "Goldenrod", "Gray", "Green", "GreenYellow", "Honeydew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenrodYellow", "LightGreen", "LightGrey", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquamarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenrod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "Seashell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

export const CssTypesChecker = {
  getCssValueType: (v: string) => {
    if (v == "") return CssValueTypes.Void;
//TODO

    return CssValueTypes.Invalid;
  },
  isZeroToOne: (v: number): boolean => {
    return (isFinite(v) && v >= 0 && v <= 1);
  },
  isColor: (v: string): boolean => {
    if(COLOR_NAMES.includes(v)) return true;
    if(v.charAt(0) == "#") {
      if(!(v.length == 4) && !(v.length ==7)) return false;
      let ret = true;
      const val = v.substring(1);
      for(const c of val) {
        if(!/[0-9A-Fa-f]/.test(c)) ret = false;
      }
      return ret;
    }
    if(v.startsWith("rgba(")) {
      const values = v.substring(5, v.length - 1).split(",");
      if (values.length != 4) return false;
      if(!CssTypesChecker.isZeroToOne(parseFloat(values.pop() as string))) return false;
      for(let v of values) {
        if(!Number.isInteger(+v) || +v < 0 || +v > 255) return false
      }
      return true;
    }
    if(v.startsWith("rgb(")) {
      const values = v.substring(4, v.length - 1).split(",");
      if(values.length != 3) return false;
      for(let v of values) {
        if(!Number.isInteger(+v) || +v < 0 || +v > 255) return false;
      }
      return true;
    }
    return false;
  }
};

