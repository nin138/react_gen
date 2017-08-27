import {Map} from "immutable";
import Css from "./Css";

export class CssClassManager {
  private classList = Map<string, Css>();
  private copy(...differ: Array<object>): CssClassManager {
    return Object.assign(Object.create(CssClassManager.prototype), this, ...differ)
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
}
