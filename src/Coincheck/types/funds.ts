import {cast, Castable} from "@bitr/castable";

export class Funds extends Castable {
    @cast public btc: number;
    @cast public jpy: number;
}
