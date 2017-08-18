export default class NinComponent {
  path: string;
  name: string;
  isInline: boolean;
  isFrame: boolean;
  allowChild: boolean;
  fullName() { return `${this.path}.${this.name}` }
}