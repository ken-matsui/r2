// tslint:disable:variable-name

import {cast, Castable} from "@bitr/castable";

export class TradingAccount extends Castable {
    @cast public id: string;
    @cast public leverage_level: number;
    @cast public max_leverage_level: number;
    @cast public current_leverage_level: number;
    @cast public pnl: string;
    @cast public equity: string;
    @cast public margin: number;
    @cast public free_margin: number;
    @cast public trader_id: string;
    @cast public status: string;
    @cast public product_code: string;
    @cast public currency_pair_code: string;
    @cast public position: number;
    @cast public balance: number;
    @cast public created_at: number;
    @cast public updated_at: number;
    @cast public pusher_channel: string;
    @cast public margin_percent: string;
    @cast public product_id: string;
    @cast public funding_currency: string;
}

export type TradingAccountsResponse = TradingAccount[];
