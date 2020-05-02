// tslint:disable:variable-name

import {cast, Castable, element} from "@bitr/castable";
import {CloseOrder} from "./closeOrder";
import {NewOrder} from "./newOrder";

export class LeveragePosition extends Castable {
    @cast public id: string;
    @cast public pair: string;
    @cast public status: string;
    @cast(Date) public created_at: Date;
    @cast public closed_at?: any;
    @cast public open_rate: number;
    @cast public closed_rate?: number;
    @cast public amount: number;
    @cast public all_amount: number;
    @cast public side: string;
    @cast public pl: number;
    @cast public new_order: NewOrder;
    @cast @element(CloseOrder) public close_orders: CloseOrder[];
}
