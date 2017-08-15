import {Map} from "immutable"
import CssData from "./Data"
import {CssValueTypes} from "./Type";

export default class CSS {
  private values: Map<string, CssValue>;
  constructor(value: Map<string, CssValue> = Map()) { this.values = value; }
  get(atr: string): CssValue { return this.values.get(atr); }
  set(atr: string ,value: string) {
    if(this.values.get(atr).value == value) return;
    this.values = this.values.set(atr, new CssValue(value));
    if(CssData.values.get(atr).children !== undefined) this.parseAttr(atr);
    else if(CssData.values.get(atr).parent != undefined) this.margeAttr(CssData.values.get(atr).parent as string);
    return new CSS(this.values);
  }
  private parseAttr(atr: string) {
    const parser: any = {
      margin_padding: (v: string) => {
        const list = v.split(" ");
        switch(list.length) {
          case 1: return [list[0], list[0], list[0], list[0]];
          case 2: return [list[0], list[1], list[0], list[1]];
          case 3: return [list[0], list[1], list[2], list[1]];
          case 4: return [list[0], list[1], list[2], list[3]];
          default: return ["", "", "", ""];
        }
      },
      margin: (v: string) => {
        const l = parser.margin_padding(v);
        this.values = this.values.set("marginTop", l[0]);
        this.values = this.values.set("marginRight", l[1]);
        this.values = this.values.set("marginBottom", l[2]);
        this.values = this.values.set("marginLeft", l[3]);
      },
      padding: (v: string) => {
        const l = parser.margin_padding(v);
        this.values = this.values.set("paddingTop", l[0]);
        this.values = this.values.set("paddingRight", l[1]);
        this.values = this.values.set("paddingBottom", l[2]);
        this.values = this.values.set("paddingLeft", l[3]);
      },
      flex: (v: string) => {
        const l = v.split(" ");
        switch(l.length) {
          case 1:
          case 2:
          case 3:
          default:
        }
      }
    };
    parser[atr.trim()](this.values.get(atr).value);
  }
  private margeAttr(parent: string) {
    const parser: any = {
      margin_padding: (atr: string) => {
        const top = this.values.get(atr + "Top").value || "0";
        const right = this.values.get(atr + "Right").value || "0";
        const bottom = this.values.get(atr + "Bottom").value || "0";
        const left = this.values.get(atr + "Left").value || "0";
        let val = "";
        if(left == right) {
          if(top == bottom) {
            if(left == top) val = top;
            else val = top +" "+ left;
          } else val = top +" "+ left +" "+ bottom;
        } else val = `${top} ${right} ${bottom} ${left}`;
        return val;
      },
      margin: () => this.values = this.values.set(parent, new CssValue(parser.margin_padding(parent))),
      padding: () => this.values = this.values.set(parent, new CssValue(parser.margin_padding(parent))),
      flex: () => {
        const grow = this.values.get("flexGrow").value;
        const shrink = this.values.get("flexShrink").value;
        const basis = this.values.get("flexBasis").value;
        let v = "";
        if(grow) v += grow + " ";
        if(shrink) v += shrink + " ";
        if(basis) v += basis;
        this.values = this.values.set(parent, new CssValue(v.trim()))
      }
    };
    parser[parent]();
  }
}


export class CssValue {
  public value: string = "";
  public type = CssValueTypes.Void;
  constructor(value: string = "") {
    this.value = value
  }
}