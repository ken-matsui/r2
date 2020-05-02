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
    // tslint:disable-next-line:variable-name
    @cast public child_order_id: string;
    // tslint:disable-next-line:variable-name
    @cast public product_code: string;
    @cast public side: string;
    // tslint:disable-next-line:variable-name
    @cast public child_order_type: string;
    @cast public price: number;
    // tslint:disable-next-line:variable-name
    @cast public average_price: number;
    @cast public size: number;
    // tslint:disable-next-line:variable-name
    @cast public child_order_state: string;
    // tslint:disable-next-line:variable-name
    @cast(Date) public expire_date: Date;
    // tslint:disable-next-line:variable-name
    @cast(Date) public child_order_date: Date;
    // tslint:disable-next-line:variable-name
    @cast public child_order_acceptance_id: string;
    // tslint:disable-next-line:variable-name
    @cast public outstanding_size: number;
    // tslint:disable-next-line:variable-name
    @cast public cancel_size: number;
    // tslint:disable-next-line:variable-name
    @cast public executed_size: number;
    // tslint:disable-next-line:variable-name
    @cast public total_commission: number;
}

export type ChildOrdersResponse = ChildOrder[];
