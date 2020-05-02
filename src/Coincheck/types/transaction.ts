import {cast, Castable} from "@bitr/castable";
import {Funds} from "./funds";

export class Transaction extends Castable {
    @cast public id: string;
    // tslint:disable-next-line:variable-name
    @cast public order_id: string;
    // tslint:disable-next-line:variable-name
    @cast(Date) public created_at: Date;
    @cast public funds: Funds;
    @cast public pair: string;
    @cast public rate: number;
    // tslint:disable-next-line:variable-name
    @cast public fee_currency: number;
    @cast public fee: number;
    @cast public liquidity: number;
    @cast public side: string;
}
