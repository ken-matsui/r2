import {cast, Castable} from "@bitr/castable";

export class Pagination extends Castable {
    @cast public limit: number;
    @cast public order: "desc" | "asc";
    // tslint:disable-next-line:variable-name
    @cast public starting_after: string;
    // tslint:disable-next-line:variable-name
    @cast public ending_before: string;
}

export interface ILeveragePositionsRequest extends Partial<Pagination> {
    status?: "open" | "closed";
}
