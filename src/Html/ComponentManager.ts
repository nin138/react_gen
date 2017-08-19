import {Map} from "immutable";
import {NinComponentInitializer} from "../Entities/NinComponent";
import {HTML_TAGS} from "./Tags";

export class ComponentManager {
  private components = Map<string, NinComponentInitializer>();
  setArray(arr: Array<NinComponentInitializer>) {
    const ret = new ComponentManager();
    ret.components = this.components;
    arr.map(v => {
      ret.components = ret.components.set(`${v.path}.${v.name}`, v);
    });
    return ret;
  }
  set(initializer: NinComponentInitializer): ComponentManager {
    const ret = new ComponentManager();
    ret.components = this.components.set(`${initializer.path}.${initializer.name}`, initializer);
    return ret
  }
  getInitializer(fullName: string): NinComponentInitializer { return this.components.get(fullName) }
  getAllPath(): Array<string> { return this.components.keySeq().toArray() }
}

export const initial = new ComponentManager().setArray(HTML_TAGS);