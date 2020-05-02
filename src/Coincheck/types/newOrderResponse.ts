// tslint:disable:variable-name

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
    @cast public order_type: string;
    @cast public stop_loss_rate?: number;
    @cast public market_buy_amount?: number;
    @cast public pair: string;
    @cast(Date) public created_at: Date;
}
