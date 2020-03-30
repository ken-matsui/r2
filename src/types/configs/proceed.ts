import {cast, Castable} from "@bitr/castable";

export class ProceedOption extends Castable {
    @cast public limitMovePercent: number;
    @cast public ttl: number;
}
