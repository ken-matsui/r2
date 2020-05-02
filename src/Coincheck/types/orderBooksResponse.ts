import {cast, Castable, element} from "@bitr/castable";

export class OrderBooksResponse extends Castable {
    @cast @element(Array, Number) public asks: number[][];
    @cast @element(Array, Number) public bids: number[][];
}
