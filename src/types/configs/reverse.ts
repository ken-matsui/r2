import {cast, Castable} from "@bitr/castable";

export class ReverseOption extends Castable {
    @cast public limitMovePercent: number;
    @cast public ttl: number;
}
