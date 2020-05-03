import {cast, Castable} from "@bitr/castable";

export class ReverseOption extends Castable {
  @cast limitMovePercent: number;
  @cast ttl: number;
}
