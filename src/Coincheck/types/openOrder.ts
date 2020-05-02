import {cast, Castable} from "@bitr/castable";

export class OpenOrder extends Castable {
    @cast public id: string;
    // tslint:disable-next-line:variable-name
    @cast public order_type: string;
    @cast public rate?: number;
    @cast public pair: string;
    // tslint:disable-next-line:variable-name
    @cast public pending_amount: number;
    // tslint:disable-next-line:variable-name
    @cast public pending_market_buy_amount: number;
    // tslint:disable-next-line:variable-name
    @cast public stop_loss_rate: number;
    // tslint:disable-next-line:variable-name
    @cast(Date) public created_at: Date;
}
