import CssData from "./Data";
import {CssStatus} from "./Css";

export enum CssValueTypes {
  Invalid, Void, Color, Len, Int, Float, ZeroToOne ,Other, Merge
}
export const COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenrod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "Goldenrod", "Gray", "Green", "GreenYellow", "Honeydew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenrodYellow", "LightGreen", "LightGrey", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquamarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenrod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "Seashell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

export const CssUtil = {
  isValid(attr: string, value: string): CssStatus {
    if(value == "") return CssStatus.Void;
    const type = CssData.values.get(attr).valueType;
    let flag: boolean = false;
    switch(type) {
      case CssValueTypes.Int: flag = CssUtil.isInt(value); break;
      case CssValueTypes.Float: flag = CssUtil.isFloat(value); break;
      case CssValueTypes.Len: flag = CssUtil.isLen(value); break;
      case CssValueTypes.Color: flag = CssUtil.isColor(value); break;
      case CssValueTypes.ZeroToOne: flag = CssUtil.isZeroToOne(value); break;
      case CssValueTypes.Merge: flag = CssUtil.isValidMergedAtr(attr, value); break;
      case CssValueTypes.Other: flag = CssUtil.isOtherAttrValid(attr, value); break;
    }
    return (flag)? CssStatus.Valid : CssStatus.Error;
  },
  isValidByType(type: CssValueTypes, value: string): CssStatus {
    let flag: boolean = false;
    switch(type) {
      case CssValueTypes.Int: flag = CssUtil.isInt(value); break;
      case CssValueTypes.Float: flag = CssUtil.isFloat(value); break;
      case CssValueTypes.Len: flag = CssUtil.isLen(value); break;
      case CssValueTypes.Color: flag = CssUtil.isColor(value); break;
      case CssValueTypes.ZeroToOne: flag = CssUtil.isZeroToOne(value); break;
    }
    return (flag)? CssStatus.Valid : CssStatus.Error;
  },
  isInt(v: string): boolean { return (isFinite(+v) && !/[.]/.test(v)) },
  isFloat(v: string): boolean { return isFinite(+v) },
  isZeroToOne: (v: string): boolean => { return (isFinite(+v) && +v >= 0 && +v <= 1) },
  isLen: (v: string): boolean => {
    if(v == "0" ) return true;
    //todo use Data.CssUnit
    if(/^+\d+px$/.test(v)) return true;
    if(/^+\d+rem$/.test(v)) return true;
    if(/^+\d+em$/.test(v)) return true;
    if(/^+\d+%$/.test(v)) return true;
    if(/^+\d+vh$/.test(v)) return true;
    if(/^+\d+vw$/.test(v)) return true;
    if(/^+\d+vmin$/.test(v)) return true;
    if(/^+\d+vmax$/.test(v)) return true;
    return false;
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
      if(!CssUtil.isZeroToOne(values.pop()!!)) return false;
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
  },
  isValidMergedAtr: (attr: string, v: string): boolean => {
    const split = v.split(" ");
    const pattern = CssData.values.get(attr).patterns;
    let ret = false;
    pattern!!.forEach(pattern => {
      if(pattern.length == split.length) {
        let flag = true;
        for(let i = 0; i < split.length; i++) {
          if(!CssUtil.isValid(pattern[i][0], split[i])) flag = false
        }
        if(flag == true) ret = true;
      }
    });
    return ret;
  },
  isOtherAttrValid: (attr: string, v: string): boolean => {
    let f = false;
    CssData.values.get(attr).values!!.forEach((data: string) => { if(data == v) f = true } );
    return f;
  },
};


