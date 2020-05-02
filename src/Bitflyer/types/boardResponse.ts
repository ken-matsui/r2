import {cast, Castable, element} from "@bitr/castable";

class PriceSizePair extends Castable {
    @cast public price: number;
    @cast public size: number;
}

// tslint:disable-next-line:max-classes-per-file
export class BoardResponse extends Castable {
    @cast public midPrice: number;
    @cast @element(PriceSizePair) public bids: PriceSizePair[];
    @cast @element(PriceSizePair) public asks: PriceSizePair[];
}
