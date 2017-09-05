import {Map} from "immutable"

export class UnitSizeCalculator {
  public unit_data = {
    rem: 16,
    vh: 0,
    vw: 0,
    vmin: 0,
    vmax: 0,
  }
}

export enum CssValueTypes {
  Invalid, Void, Color, Len, Int, Float, ZeroToOne ,Other, Merge
}

export enum CssUnit {
  Px = "px",
  Rem = "rem",
  Em = "em",
  Percent = "%",
  Vh = "vh",
  Vw = "vw",
  Vmin = "vmin",
  Vmax = "vmax"
}
export enum CssCategory {
  Position, Display , Size , Text, Flex
}

export enum CssCondition {
  FlexBox, FlexItem, NotStatic
}


interface CssAttrData {
  category: CssCategory
  valueType: CssValueTypes
  values?: Array<string>
  condition?: CssCondition
  children?: Array<string>
  parent?: string
  patterns?: Array<Array<Array<string>>>
}

export default class CssData {
  public static ALL_ATTR_HAS = ["inherit", "initial", "unset"];
  public static COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenrod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "Goldenrod", "Gray", "Green", "GreenYellow", "Honeydew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenrodYellow", "LightGreen", "LightGrey", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquamarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenrod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "Seashell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
  public static Flex_BOX_ATTRS = ["flexDirection", "flexWrap", "justifyContent", "alignItems", "alignContent"];
  public static FLEX_ITEM_ATTRS = ["flex", "flexGrow", "flexShrink", "flexBasis", "order"];
  public static DISPLAY_DIRECTIONS = ["top", "left", "right", "bottom"];
  public static values: Map<string, CssAttrData> = Map({
    position: {
      category: CssCategory.Position,
      valueType: CssValueTypes.Other,
      values: ["static", "relative", "absolute", "fixed"]
    },
    top: {
      category: CssCategory.Position,
      valueType: CssValueTypes.Len,
      condition: CssCondition.NotStatic,
    },
    left: {
      category: CssCategory.Position,
      valueType: CssValueTypes.Len,
      condition: CssCondition.NotStatic,
    },
    right: {
      category: CssCategory.Position,
      valueType: CssValueTypes.Len,
      condition: CssCondition.NotStatic,
    },
    bottom: {
      category: CssCategory.Position,
      valueType: CssValueTypes.Len,
      condition: CssCondition.NotStatic,
    },
    float: {
      category: CssCategory.Position,
      valueType: CssValueTypes.Other,
      values: ["none", "left", "right"],
    },
    clear: {
      category: CssCategory.Position,
      valueType: CssValueTypes.Other,
      values: ["left", "right", "both"],
    },
    zIndex: {
      category: CssCategory.Position,
      valueType: CssValueTypes.Int,
    },
    display: {
      category: CssCategory.Display,
      valueType: CssValueTypes.Len,
      values: ["block", "inline", "inline-block", "flex", "inline-flex", "none", "inherit"],
    },
    flex: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Merge,
      patterns: [
        [["flexGrow"]],
        [["flexBasis"]],
        [["flexGrow"], ["flexShrink"]],
        [["flexGrow"], ["flexBasis"]],
        [["flexGrow"], ["flexShrink"], ["flexBasis"]]
      ],
      children: ["flexGrow, FlexShrink, FlexBasis"],
      condition: CssCondition.FlexItem,
    },
    flexGrow: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Int,
      parent: "flex",
      condition: CssCondition.FlexItem,
    },
    flexShrink: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Int,
      parent: "flex",
      condition: CssCondition.FlexItem,
    },
    flexBasis: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Len,
      parent: "flex",
      condition: CssCondition.FlexItem,
    },
    flexDirection: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Other,
      values: ["row", "row-reverse", "column", "column-reverse"],
      condition: CssCondition.FlexBox,
    },
    flexWrap: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Other,
      values: ["nowrap", "wrap", "wrap-reverse"],
      condition: CssCondition.FlexBox,
    },
    justifyContent: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Other,
      values: ["flex-start", "flex-end", "center", "space-around", "spane-between"],
      condition: CssCondition.FlexBox,
    },
    alignItems: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Other,
      values: ["stretch", "flex-start", "flex-end", "center", "base-line"],
      condition: CssCondition.FlexBox
    },
    alignContent: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Other,
      values: ["stretch", "flex-start", "flex-end", "center", "space-around", "spane-between"],
      condition: CssCondition.FlexBox
    },
    alignSelf: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Other,
      values: ["stretch", "flex-start", "flex-end", "center", "space-around", "spane-between"],
      condition: CssCondition.FlexItem,
    },
    order: {
      category: CssCategory.Flex,
      valueType: CssValueTypes.Int,
      condition: CssCondition.FlexItem,
    },
    opacity: {
      category: CssCategory.Display,
      valueType: CssValueTypes.ZeroToOne,
    },
    backgroundColor: {
      category: CssCategory.Display,
      valueType: CssValueTypes.Color,
    },
    width: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
    },
    height: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
    },
    margin: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Merge,
      patterns: [
        [["marginTop", "marginLeft", "marginRight", "marginBottom"]],
        [["marginTop", "marginBottom"], ["marginLeft", "marginRight"]],
        [["marginTop"], ["marginLeft", "marginRight"], ["marginBottom"]],
        [["marginTop"], ["marginRight"], ["marginBottom"], ["marginLeft"]]
      ],
      children: ["marginTop", "marginLeft", "marginRight", "marginBottom"],
    },
    marginTop: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
      parent: "margin"
    },
    marginLeft: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
      parent: "margin"
    },
    marginRight: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
      parent: "margin"
    },
    marginBottom: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
      parent: "margin"
    },
    padding: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Merge,
      patterns: [
        [["paddingTop", "paddingLeft", "paddingRight", "paddingBottom"]],
        [["paddingTop", "paddingBottom"], ["paddingLeft", "paddingRight"]],
        [["paddingTop"], ["paddingLeft", "paddingRight"], ["paddingBottom"]],
        [["paddingTop"], ["paddingRight"], ["paddingBottom"], ["paddingLeft"]]
      ],
      children: ["paddingTop", "paddingLeft", "paddingRight", "paddingBottom"],
    },
    paddingTop: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
      parent: "padding",
    },
    paddingLeft: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
      parent: "padding",
    },
    paddingRight: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
      parent: "padding",
    },
    paddingBottom: {
      category: CssCategory.Size,
      valueType: CssValueTypes.Len,
      parent: "padding",
    },
    fontSize: {
      category: CssCategory.Text,
      valueType: CssValueTypes.Len,
    },
    fontWeight: {
      category: CssCategory.Text,
      valueType: CssValueTypes.Other,
      values: ["normal", "bold", "lighter", "bolder"],
    },
    color: {
      category: CssCategory.Text,
      valueType: CssValueTypes.Color,
    }
  });

}

