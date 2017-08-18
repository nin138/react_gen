import {Map} from "immutable";
import {NinComponentInitializer} from "../Entities/NinComponent";
import {HTML_TAGS} from "./Tags";

export class ComponentManager {
  private components = Map<string, NinComponentInitializer>();
  setArray(arr: Array<NinComponentInitializer>) {
    arr.map(v => {
      this.set(v);
    });
  }
  set(initializer: NinComponentInitializer) { this.components = this.components.set(`${initializer.path}.${initializer.name}`, initializer) }
  getInitializer(fullName: string): NinComponentInitializer { return this.components.get(fullName) }
  getAllPath(): Array<string> { return this.components.keySeq().toArray() }
}

export const initial = new ComponentManager();
initial.setArray(HTML_TAGS);