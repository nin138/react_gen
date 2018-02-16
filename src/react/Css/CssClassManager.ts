import {Map} from "immutable";
import Css from "./Css";
import {SavedCss} from "../../files/FileManager";

export class CssClassManager {
  private classList = Map<string, Css>();
  private copy(...differ: Array<object>): CssClassManager {
    return Object.assign(Object.create(CssClassManager.prototype), this, ...differ)
  }
  loadSavedCss(savedCss: SavedCss): CssClassManager {
    let classList = this.classList;
    Object.keys(savedCss).forEach(it => {
      classList = classList.set(it, Css.fromSavable(savedCss[it]))
    });
    return this.copy({classList});
  }
  addArray(map: Map<string, Css>) {
    return this.copy({classList: this.classList.merge(map)})
  }
  add(name: string, css: Css) {
    return this.copy({classList: this.classList.set(name, css)})
  }
  update(name: string, css: Css) {
    return this.copy({classList: this.classList.update(name, v => css)})
  }
  updateAttr(name: string, attr: string, value: string) {
    return this.copy({classList: this.classList.update(name, v => v.set(attr, value))})
  }
  getCss(name: string): Css|undefined { return this.classList.get(name) }
  getAllClassName(): Array<string> { return this.classList.keySeq().toArray() }
  getCssString(): string {
    return this.classList
        .map((value, key) => `.${key} ${value!!.getRowString()}`)
        .reduce((r, v) => r!! + v, "");
  }
  getSavable(): {[className: string]: {[attr: string]: string}} {
    const ret: {[className: string]: {[attr: string]: string}} = {};
    this.getAllClassName().forEach(it => {
      ret[it] = this.classList.get(it).getSavable();
    });
    return ret;
  }
}
