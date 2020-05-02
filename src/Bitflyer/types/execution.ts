// tslint:disable:variable-name

import {cast, Castable} from "@bitr/castable";

export interface IExecutionsParam {
    product_code?: string;
    count?: number;
    before?: number;
    after?: number;
    child_order_id?: string;
    child_order_acceptance_id?: string;
}

export class Execution extends Castable {
    @cast public id: number;
    @cast public child_order_id: string;
    @cast public side: string;
    @cast public price: number;
    @cast public size: number;
    @cast public commission: number;
    @cast(Date) public exec_date: Date;
    @cast public child_order_acceptance_id: string;
}

export type ExecutionsResponse = Execution[];
