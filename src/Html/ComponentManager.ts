import {Map} from "immutable";

export default class ComponentManager {
  private components: Map<string, any>;
  load(path: string, data: any) {
    this.components = this.components.set(path, data)
  }
  getAllPath() { return this.components.keySeq().toArray }
}