// tslint:disable:variable-name

import {cast, Castable} from "@bitr/castable";

export class Execution extends Castable {
    @cast public id: string;
    @cast public quantity: string;
    @cast public price: string;
    @cast public taker_side: string;
    @cast public created_at: number;
    @cast public my_side: string;
}
