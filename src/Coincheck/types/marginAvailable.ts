import {cast, Castable} from "@bitr/castable";

export class MarginAvailable extends Castable {
    @cast public jpy: number;
}
