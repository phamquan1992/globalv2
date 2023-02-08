import { Inputbase } from "./input-base";

export class InputPassword extends Inputbase<string> {
  override type = 'password';
}
