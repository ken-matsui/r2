import {cast, Castable} from "@bitr/castable";
import {Funds} from "./funds";

export class Transaction extends Castable {
    @cast public id: string;
    @cast public order_id: string;
    @cast(Date) public created_at: Date;
    @cast public funds: Funds;
    @cast public pair: string;
    @cast public rate: number;
    @cast public fee_currency: number;
    @cast public fee: number;
    @cast public liquidity: number;
    @cast public side: string;
}
