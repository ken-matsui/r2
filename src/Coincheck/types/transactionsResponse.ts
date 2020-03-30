import {cast, Castable, element} from "@bitr/castable";
import {IOrder} from "../../types";
import {Pagination} from "./pagination";
import {Transaction} from "./transaction";

export class TransactionsResponse extends Castable {
    @cast public success: boolean;
    @cast public pagination: Pagination;
    @cast
    @element(Transaction)
    public data: Transaction[];
}

export interface ICashMarginTypeStrategy {
    send(order: IOrder): Promise<void>;
    getBtcPosition(): Promise<number>;
}
