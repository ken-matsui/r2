// tslint:disable:variable-name
import { cast, Castable, element } from "@bitr/castable";
import { IOrder } from "../types";

export class AccountsBalanceResponse extends Castable {
  @cast public success: boolean;
  @cast public jpy: number;
  @cast public btc: number;
  @cast public usd: number;
  @cast public cny: number;
  @cast public eth: number;
  @cast public etc: number;
  @cast public dao: number;
  @cast public lsk: number;
  @cast public fct: number;
  @cast public xmr: number;
  @cast public rep: number;
  @cast public xrp: number;
  @cast public zec: number;
  @cast public xem: number;
  @cast public ltc: number;
  @cast public dash: number;
  @cast public bch: number;
  @cast public jpy_reserved: number;
  @cast public btc_reserved: number;
  @cast public usd_reserved: number;
  @cast public cny_reserved: number;
  @cast public eth_reserved: number;
  @cast public etc_reserved: number;
  @cast public dao_reserved: number;
  @cast public lsk_reserved: number;
  @cast public fct_reserved: number;
  @cast public xmr_reserved: number;
  @cast public rep_reserved: number;
  @cast public xrp_reserved: number;
  @cast public zec_reserved: number;
  @cast public xem_reserved: number;
  @cast public ltc_reserved: number;
  @cast public dash_reserved: number;
  @cast public bch_reserved: number;
  @cast public jpy_lend_in_use: number;
  @cast public btc_lend_in_use: number;
  @cast public usd_lend_in_use: number;
  @cast public cny_lend_in_use: number;
  @cast public eth_lend_in_use: number;
  @cast public etc_lend_in_use: number;
  @cast public dao_lend_in_use: number;
  @cast public lsk_lend_in_use: number;
  @cast public fct_lend_in_use: number;
  @cast public xmr_lend_in_use: number;
  @cast public rep_lend_in_use: number;
  @cast public xrp_lend_in_use: number;
  @cast public zec_lend_in_use: number;
  @cast public xem_lend_in_use: number;
  @cast public ltc_lend_in_use: number;
  @cast public dash_lend_in_use: number;
  @cast public bch_lend_in_use: number;
  @cast public jpy_lent: number;
  @cast public btc_lent: number;
  @cast public usd_lent: number;
  @cast public cny_lent: number;
  @cast public eth_lent: number;
  @cast public etc_lent: number;
  @cast public dao_lent: number;
  @cast public lsk_lent: number;
  @cast public fct_lent: number;
  @cast public xmr_lent: number;
  @cast public rep_lent: number;
  @cast public xrp_lent: number;
  @cast public zec_lent: number;
  @cast public xem_lent: number;
  @cast public ltc_lent: number;
  @cast public dash_lent: number;
  @cast public bch_lent: number;
  @cast public jpy_debt: number;
  @cast public btc_debt: number;
  @cast public usd_debt: number;
  @cast public cny_debt: number;
  @cast public eth_debt: number;
  @cast public etc_debt: number;
  @cast public dao_debt: number;
  @cast public lsk_debt: number;
  @cast public fct_debt: number;
  @cast public xmr_debt: number;
  @cast public rep_debt: number;
  @cast public xrp_debt: number;
  @cast public zec_debt: number;
  @cast public xem_debt: number;
  @cast public ltc_debt: number;
  @cast public dash_debt: number;
  @cast public bch_debt: number;
}

export class Margin extends Castable {
  @cast public jpy: number;
}

export class MarginAvailable extends Castable {
  @cast public jpy: number;
}

export class LeverageBalanceResponse extends Castable {
  @cast public success: boolean;
  @cast public margin: Margin;
  @cast public margin_available: MarginAvailable;
  @cast public margin_level: number;
}

export class Pagination extends Castable {
  @cast public limit: number;
  @cast public order: "desc" | "asc";
  @cast public starting_after: string;
  @cast public ending_before: string;
}

export interface ILeveragePositionsRequest extends Partial<Pagination> {
  status?: "open" | "closed";
}

export class NewOrder extends Castable {
  @cast public id: string;
  @cast public side: string;
  @cast public rate?: number;
  @cast public amount?: number;
  @cast public pending_amount: number;
  @cast public status: string;
  @cast(Date) public created_at: Date;
}

export class CloseOrder extends Castable {
  @cast public id: string;
  @cast public side: string;
  @cast public rate: number;
  @cast public amount: number;
  @cast public pending_amount: number;
  @cast public status: string;
  @cast public created_at: Date;
}

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
  @cast
  @element(CloseOrder)
  public close_orders: CloseOrder[];
}

export class LeveragePositionsResponse extends Castable {
  @cast public success: boolean;
  @cast
  @element(LeveragePosition)
  public data: LeveragePosition[];
  @cast public pagination: Pagination;
}

export class OrderBooksResponse extends Castable {
  @cast
  @element(Array, Number)
  public asks: number[][];
  @cast
  @element(Array, Number)
  public bids: number[][];
}

export interface INewOrderRequest {
  pair: string;
  order_type: string;
  rate?: number;
  amount?: number;
  market_buy_amount?: number;
  position_id?: number;
  stop_loss_rate?: number;
}

export class NewOrderResponse extends Castable {
  @cast public success: boolean;
  @cast public id: string;
  @cast public rate: number;
  @cast public amount: number;
  @cast public order_type: string;
  @cast public stop_loss_rate?: number;
  @cast public market_buy_amount?: number;
  @cast public pair: string;
  @cast(Date) public created_at: Date;
}

export class CancelOrderResponse extends Castable {
  @cast public success: boolean;
  @cast public id: string;
}

export class OpenOrder extends Castable {
  @cast public id: string;
  @cast public order_type: string;
  @cast public rate?: number;
  @cast public pair: string;
  @cast public pending_amount: number;
  @cast public pending_market_buy_amount: number;
  @cast public stop_loss_rate: number;
  @cast(Date) public created_at: Date;
}

export class OpenOrdersResponse extends Castable {
  @cast public success: boolean;
  @cast
  @element(OpenOrder)
  public orders: OpenOrder[];
}

export class Funds extends Castable {
  @cast public btc: number;
  @cast public jpy: number;
}

export class Transaction extends Castable {
  @cast public id: string;
  @cast public order_id: string;
  @cast(Date) public created_at: Date;
  @cast public funds: Funds;
  @cast public pair: string;
  @cast public rate: number;
  @cast public fee_currency: number;
  @cast public fee: number;
  @cast public liquidity: number;
  @cast public side: string;
}

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
