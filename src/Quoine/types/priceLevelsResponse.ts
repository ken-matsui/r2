// tslint:disable:variable-name

import {cast, Castable, element} from "@bitr/castable";

export class PriceLevelsResponse extends Castable {
    @cast @element(Array, Number) public buy_price_levels: number[][];
    @cast @element(Array, Number) public sell_price_levels: number[][];
}
