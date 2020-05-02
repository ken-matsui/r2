// tslint:disable:variable-name

import {cast, Castable} from "@bitr/castable";

export interface ISendChildOrderRequest {
    product_code: string;
    child_order_type: string;
    side: string;
    price?: number;
    size: number;
    minute_to_expire?: number;
    time_in_force?: string;
}

export class SendChildOrderResponse extends Castable {
    @cast public child_order_acceptance_id: string;
}

export interface ICancelChildOrderRequest {
    product_code: string;
    child_order_acceptance_id?: string;
    child_order_id?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface ICancelChildOrderResponse {}
