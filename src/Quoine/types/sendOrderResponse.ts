// tslint:disable:variable-name

import {cast, Castable} from "@bitr/castable";

export interface IBrokerOrder {
    order_type: string;
    product_id: string;
    side: string;
    quantity: number;
    price: number;
    leverage_level?: number;
    order_direction?: string;
}

export interface ISendOrderRequest {
    order: IBrokerOrder;
}

export class SendOrderResponse extends Castable {
    @cast public id: string;
    @cast public order_type: string;
    @cast public quantity: string;
    @cast public disc_quantity: string;
    @cast public iceberg_total_quantity: string;
    @cast public side: string;
    @cast public filled_quantity: string;
    @cast public price: number;
    @cast public created_at: number;
    @cast public updated_at: number;
    @cast public status: string;
    @cast public leverage_level: number;
    @cast public source_exchange: string;
    @cast public product_id: string;
    @cast public product_code: string;
    @cast public funding_currency: string;
    @cast public crypto_account_id?: any;
    @cast public currency_pair_code: string;
    @cast public average_price: string;
    @cast public target: string;
    @cast public order_fee: string;
    @cast public source_action: string;
    @cast public unwound_trade_id?: any;
    @cast public trade_id?: any;
}

export type CancelOrderResponse = any;
