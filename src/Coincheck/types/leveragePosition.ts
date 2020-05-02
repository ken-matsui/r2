import {cast, Castable, element} from "@bitr/castable";
import {CloseOrder} from "./closeOrder";
import {NewOrder} from "./newOrder";

export class LeveragePosition extends Castable {
    @cast public id: string;
    @cast public pair: string;
    @cast public status: string;
    // tslint:disable-next-line:variable-name
    @cast(Date) public created_at: Date;
    // tslint:disable-next-line:variable-name
    @cast public closed_at?: any;
    // tslint:disable-next-line:variable-name
    @cast public open_rate: number;
    // tslint:disable-next-line:variable-name
    @cast public closed_rate?: number;
    @cast public amount: number;
    // tslint:disable-next-line:variable-name
    @cast public all_amount: number;
    @cast public side: string;
    @cast public pl: number;
    // tslint:disable-next-line:variable-name
    @cast public new_order: NewOrder;
    // tslint:disable-next-line:variable-name
    @cast @element(CloseOrder) public close_orders: CloseOrder[];
}
