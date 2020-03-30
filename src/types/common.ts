export interface IQuote {
  broker: Broker;
  side: QuoteSide;
  price: number;
  volume: number;
}

export interface IExecution {
  broker: Broker;
  brokerOrderId: string;
  cashMarginType: CashMarginType;
  size: number;
  price: number;
  execTime: Date;
  side: OrderSide;
  symbol: string;
}

export interface IOrder {
  broker: Broker;
  side: OrderSide;
  size: number;
  price: number;
  cashMarginType: CashMarginType;
  type: OrderType;
  leverageLevel?: number;
  id: string;
  symbol: string;
  timeInForce: TimeInForce;
  brokerOrderId: string;
  status: OrderStatus;
  filledSize: number;
  creationTime: Date;
  sentTime: Date;
  lastUpdated: Date;
  executions: IExecution[];
}

export enum OrderSide {
  Buy = "Buy",
  Sell = "Sell",
}

export enum TimeInForce {
  None = "None",
  Day = "Day",
  Gtc = "Gtc",
  Ioc = "Ioc",
  Fok = "Fok",
  Gtd = "Gtd",
}

export enum CashMarginType {
  Cash = "Cash",
  MarginOpen = "MarginOpen",
  NetOut = "NetOut",
}

export enum QuoteSide {
  Ask = "Ask",
  Bid = "Bid",
}

export enum OrderType {
  Market = "Market",
  Limit = "Limit",
  Stop = "Stop",
  StopLimit = "StopLimit",
}

export enum OrderStatus {
  New = "New",
  PartiallyFilled = "PartiallyFilled",
  Filled = "Filled",
  Canceled = "Canceled",
  PendingCancel = "PendingCancel",
  PendingAmend = "PendingAmend",
  PendingNew = "PendingNew",
  Rejected = "Rejected",
  Expired = "Expired",
}

export type Broker = string;
