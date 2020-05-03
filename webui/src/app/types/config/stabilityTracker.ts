import {cast, Castable} from "@bitr/castable";

export class StabilityTrackerConfig extends Castable {
  @cast threshold: number;
  @cast recoveryInterval: number;
}
