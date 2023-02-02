import { Inputbase } from "./input-base";

export class InputDate extends Inputbase<string> {
  override controlType = 'Date';
}
