import { help } from "./hepl";

class User {
  private _name: string;
  constructor(public InputName: string) {
    this._name = InputName;
  }
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}
const user = new User("John");
help(user);
console.log(user);
