import {cast, Castable} from "@bitr/castable";
import {ProceedOption, ReverseOption} from "../config";

export class OnSingleLegConfig extends Castable {
  @cast action: 'Cancel' | 'Reverse' | 'Proceed';
  @cast actionOnExit: 'Cancel' | 'Reverse' | 'Proceed';
  @cast options: CancelOption | ReverseOption | ProceedOption;
}

export type CancelOption = {};
