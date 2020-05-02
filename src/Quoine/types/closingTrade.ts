// tslint:disable:variable-name

import {cast, Castable} from "@bitr/castable";

export type CloseAllResponse = ClosingTrade[];

export class ClosingTrade extends Castable {
    @cast public id: number;
    @cast public currency_pair_code: string;
    @cast public status: string;
    @cast public side: string;
    @cast public margin_used: number;
    @cast public open_quantity: number;
    @cast public close_quantity: number;
    @cast public quantity: number;
    @cast public leverage_level: number;
    @cast public product_code: string;
    @cast public product_id: number;
    @cast public open_price: number;
    @cast public close_price: number;
    @cast public trader_id: number;
    @cast public open_pnl: number;
    @cast public close_pnl: number;
    @cast public pnl: number;
    @cast public stop_loss: number;
    @cast public take_profit: number;
    @cast public funding_currency: string;
    @cast public created_at: number;
    @cast public updated_at: number;
    @cast public total_interest: number;
}
