import { cast, Castable, element } from "@bitr/castable";

class PriceSizePair extends Castable {
  @cast public price: number;
  @cast public size: number;
}

export class BoardResponse extends Castable {
  @cast public midPrice: number;
  @cast
  @element(PriceSizePair)
  public bids: PriceSizePair[];
  @cast
  @element(PriceSizePair)
  public asks: PriceSizePair[];
}

export interface ISendChildOrderRequest {
  product_code: string;
  child_order_type: string;
  side: string;
  price?: number;
  size: number;
  minute_to_expire?: number;
  time_in_force?: string;
}

export class SendChildOrderResponse extends Castable {
  @cast public child_order_acceptance_id: string;
}

export interface ICancelChildOrderRequest {
  product_code: string;
  child_order_acceptance_id?: string;
  child_order_id?: string;
}

export interface ICancelChildOrderResponse {}

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

export class Balance extends Castable {
  @cast public currency_code: string;
  @cast public amount: number;
  @cast public available: number;
}

export type BalanceResponse = Balance[];

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
