import {cast, Castable} from "@bitr/castable";

export class ProceedOption extends Castable {
  @cast limitMovePercent: number;
  @cast ttl: number;
}
