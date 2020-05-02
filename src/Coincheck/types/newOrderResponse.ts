import {cast, Castable} from "@bitr/castable";

export interface INewOrderRequest {
    pair: string;
    order_type: string;
    rate?: number;
    amount?: number;
    market_buy_amount?: number;
    position_id?: number;
    stop_loss_rate?: number;
}

export class NewOrderResponse extends Castable {
    @cast public success: boolean;
    @cast public id: string;
    @cast public rate: number;
    @cast public amount: number;
    // tslint:disable-next-line:variable-name
    @cast public order_type: string;
    // tslint:disable-next-line:variable-name
    @cast public stop_loss_rate?: number;
    // tslint:disable-next-line:variable-name
    @cast public market_buy_amount?: number;
    @cast public pair: string;
    // tslint:disable-next-line:variable-name
    @cast(Date) public created_at: Date;
}
