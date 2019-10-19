import { Map } from "immutable";
import { Util } from "../../Util";
import { CssUtil } from "./CssUtil";
import CssData from "./Data";

export default class Css {
  private values: Map<string, CssValue>;
  constructor(value: Map<string, CssValue> = defaultCss()) {
    this.values = value;
  }
  static fromSavable(map: { [attr: string]: string }): Css {
    let css = new Css();
    Object.keys(map).forEach(it => {
      css = css.set(it, map[it]);
    });
    return css;
  }
  getSavable(): { [attr: string]: string } {
    return this.values
      .map(it => it!.value)
      .filter(it => it !== "")
      .toObject();
  }
  get(atr: string): CssValue {
    return this.values.get(atr);
  }
  set(atr: string, value: string): Css {
    if (this.values.get(atr).value == value) return this;
    let newValues = this.values.set(atr, {
      value,
      status: CssUtil.isValid(atr, value)
    });
    if (CssData.values.get(atr).children !== undefined) {
      newValues = Css.parseAttr(atr, newValues);
    } else if (CssData.values.get(atr).parent != undefined) {
      newValues = Css.margeAttr(
        CssData.values.get(atr).parent as string,
        newValues
      );
    }
    return new Css(newValues);
  }
  getAll(): Map<string, CssValue> {
    return this.values;
  }
  getRowString(): string {
    return (
      "{\n" +
      this.values
        .filter(value => value!.status === CssStatus.Valid)
        .map(
          (value, key) => `\t${Util.camelToChain(key!)}: ${value!!.value};\n`
        )
        .reduce((r, v) => r!! + v, "") +
      "}\n"
    );
  }

  private static parseAttr(
    attr: string,
    values: Map<string, CssValue>
  ): Map<string, CssValue> {
    const parser: any = {
      margin_padding: (v: string) => {
        const list = v.split(" ");
        switch (list.length) {
          case 1:
            return [list[0], list[0], list[0], list[0]];
          case 2:
            return [list[0], list[1], list[0], list[1]];
          case 3:
            return [list[0], list[1], list[2], list[1]];
          case 4:
            return [list[0], list[1], list[2], list[3]];
          default:
            return ["", "", "", ""];
        }
      },
      margin: (v: string) => {
        const l = parser.margin_padding(v);
        values = values.set("marginTop", l[0]);
        values = values.set("marginRight", l[1]);
        values = values.set("marginBottom", l[2]);
        values = values.set("marginLeft", l[3]);
      },
      padding: (v: string) => {
        const l = parser.margin_padding(v);
        values = values.set("paddingTop", l[0]);
        values = values.set("paddingRight", l[1]);
        values = values.set("paddingBottom", l[2]);
        values = values.set("paddingLeft", l[3]);
      },
      flex: (v: string) => {
        const l = v.split(" ");
        switch (l.length) {
          case 1: // todo
          case 2:
          case 3:
          default:
        }
      }
    };
    parser[attr.trim()](values.get(attr).value);
    return values;
  }
  private static margeAttr(
    parent: string,
    values: Map<string, CssValue>
  ): Map<string, CssValue> {
    const parser: any = {
      margin_padding: (atr: string) => {
        const top = values.get(atr + "Top").value || "0";
        const right = values.get(atr + "Right").value || "0";
        const bottom = values.get(atr + "Bottom").value || "0";
        const left = values.get(atr + "Left").value || "0";
        let val = "";
        if (left == right) {
          if (top == bottom) {
            if (left == top) val = top;
            else val = top + " " + left;
          } else val = top + " " + left + " " + bottom;
        } else val = `${top} ${right} ${bottom} ${left}`;
        return val;
      },
      margin: () =>
        (values = values.set(parent, {
          value: parser.margin_padding(parent),
          status: CssUtil.isValid(parent, parser.margin_padding(parent))
        })),
      padding: () =>
        (values = values.set(parent, {
          value: parser.margin_padding(parent),
          status: CssUtil.isValid(parent, parser.margin_padding(parent))
        })),
      flex: () => {
        const grow = values.get("flexGrow").value;
        const shrink = values.get("flexShrink").value;
        const basis = values.get("flexBasis").value;
        let v = "";
        if (grow) v += grow + " ";
        if (shrink) v += shrink + " ";
        if (basis) v += basis;
        values = values.set(parent, {
          value: v,
          status: CssUtil.isValid(parent, v)
        });
      }
    };
    parser[parent]();
    return values;
  }
}

export enum CssStatus {
  Void,
  Error,
  Warning,
  Valid
}

export interface CssValue {
  value: string;
  status: CssStatus;
}

const defaultCss = (): Map<string, CssValue> => {
  const obj: any = {};
  CssData.values.keySeq().forEach(v => {
    obj[v!!] = { value: "", status: CssStatus.Void };
  });
  return Map(obj);
};
