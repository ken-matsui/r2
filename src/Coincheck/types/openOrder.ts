import {cast, Castable} from "@bitr/castable";

export class OpenOrder extends Castable {
    @cast public id: string;
    @cast public order_type: string;
    @cast public rate?: number;
    @cast public pair: string;
    @cast public pending_amount: number;
    @cast public pending_market_buy_amount: number;
    @cast public stop_loss_rate: number;
    @cast(Date) public created_at: Date;
}
