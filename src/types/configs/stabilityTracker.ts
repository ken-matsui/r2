import {cast, Castable} from "@bitr/castable";

export class StabilityTrackerConfig extends Castable {
    @cast public threshold: number;
    @cast public recoveryInterval: number;
}
