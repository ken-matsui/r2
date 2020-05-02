// tslint:disable:variable-name

import {cast, Castable} from "@bitr/castable";

export interface IChildOrdersParam {
    product_code?: string;
    count?: number;
    before?: number;
    after?: number;
    child_order_state?: string;
    child_order_id?: string;
    child_order_acceptance_id?: string;
    parent_order_id?: string;
}

export class ChildOrder extends Castable {
    @cast public id: number;
    @cast public child_order_id: string;
    @cast public product_code: string;
    @cast public side: string;
    @cast public child_order_type: string;
    @cast public price: number;
    @cast public average_price: number;
    @cast public size: number;
    @cast public child_order_state: string;
    @cast(Date) public expire_date: Date;
    @cast(Date) public child_order_date: Date;
    @cast public child_order_acceptance_id: string;
    @cast public outstanding_size: number;
    @cast public cancel_size: number;
    @cast public executed_size: number;
    @cast public total_commission: number;
}

export type ChildOrdersResponse = ChildOrder[];
