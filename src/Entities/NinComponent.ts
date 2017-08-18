export default class NinComponent {
  path: string;
  name: string;
  isInline: boolean;
  isFrame: boolean;
  allowChild: boolean;
  fullName() { return `${this.path}.${this.name}` }
  constructor(initializer: NinComponentInitializer) {
    this.path = initializer.path;
    this.name = initializer.name;
    this.isInline = initializer.isInline;
    this.isFrame = initializer.isFrame;
    this.allowChild = initializer.allowChild;
  }
}

export interface NinComponentInitializer {
  path: string;
  name: string;
  isInline: boolean;
  isFrame: boolean;
  allowChild: boolean;
}