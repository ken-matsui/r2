import {cast, Castable} from "@bitr/castable";

export class Margin extends Castable {
    @cast public jpy: number;
}
