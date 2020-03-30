// tslint:disable:variable-name
import { cast, Castable, element } from "@bitr/castable";

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

export class Execution extends Castable {
  @cast public id: string;
  @cast public quantity: string;
  @cast public price: string;
  @cast public taker_side: string;
  @cast public created_at: number;
  @cast public my_side: string;
}

export class OrdersResponse extends Castable {
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
  @cast public trade_id: string;
  @cast public settings?: any;
  @cast public trailing_stop_type: boolean;
  @cast public trailing_stop_value: boolean;
  @cast
  @element(Execution)
  public executions: Execution[];
  @cast public stop_triggered_time?: any;
}

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
export class PriceLevelsResponse extends Castable {
  @cast
  @element(Array, Number)
  public buy_price_levels: number[][];
  @cast
  @element(Array, Number)
  public sell_price_levels: number[][];
}

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

export class AccountBalance extends Castable {
  @cast public currency: string;
  @cast public balance: number;
}

export type AccountBalanceResponse = AccountBalance[];

export interface ICashMarginTypeStrategy {
  getBtcPosition(): Promise<number>;
}
