import {cast, Castable, element} from "@bitr/castable";
import {LeveragePosition} from "./leveragePosition";
import {Pagination} from "./pagination";

export class LeveragePositionsResponse extends Castable {
    @cast public success: boolean;
    @cast @element(LeveragePosition) public data: LeveragePosition[];
    @cast public pagination: Pagination;
}
