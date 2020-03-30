import { TimeSeries } from "@bitr/chronodb";
import { EventEmitter } from "events";
import OrderImpl from "../OrderImpl";
import { Broker, IOrder, IQuote } from "./common";
import { ConfigRoot } from "./config";

export interface IBrokerAdapter {
  getPositions?: () => Promise<Map<string, number>>;
  broker: Broker;
  cancel(order: IOrder): Promise<void>;
  fetchQuotes(): Promise<IQuote[]>;
  getBtcPosition(): Promise<number>;
  refresh(order: IOrder): Promise<void>;
  send(order: IOrder): Promise<void>;
}

export interface IBrokerMap<T> {
  [key: string]: T;
}

export type OrderPair = [OrderImpl, OrderImpl];

export interface ISpreadAnalysisResult {
  bid: IQuote;
  ask: IQuote;
  invertedSpread: number;
  availableVolume: number;
  targetVolume: number;
  targetProfit: number;
  profitPercentAgainstNotional: number;
}

export interface IPairSummary {
  entryProfit: number;
  entryProfitRatio: number;
  currentExitCost?: number;
  currentExitCostRatio?: number;
  currentExitNetProfitRatio?: number;
}

export interface IPairWithSummary {
  key: string;
  pair: OrderPair;
  pairSummary: IPairSummary;
  exitAnalysisResult?: ISpreadAnalysisResult;
}

export interface ISpreadStat {
  timestamp: number;
  byBroker: { [x: string]: { ask?: IQuote; bid?: IQuote; spread?: number } };
  bestCase: ISpreadAnalysisResult;
  worstCase: ISpreadAnalysisResult;
}

export interface ILimitChecker {
  check(): ILimitCheckResult;
}

export interface ILimitCheckResult {
  success: boolean;
  reason: string;
  message: string;
}

export interface IConfigStore extends EventEmitter {
  config: ConfigRoot;
}

export interface IBrokerPosition {
  broker: Broker;
  longAllowed: boolean;
  shortAllowed: boolean;
  baseCcyPosition: number;
  allowedLongSize: number;
  allowedShortSize: number;
}

export interface IOrderPairKeyValue {
  key: string;
  value: OrderPair;
}

export interface IActivePairStore extends EventEmitter {
  get(key: string): Promise<OrderPair>;
  getAll(): Promise<IOrderPairKeyValue[]>;
  put(value: OrderPair): Promise<string>;
  del(key: string): Promise<void>;
  delAll(): Promise<{}>;
}

export interface ISpreadStatTimeSeries extends TimeSeries<ISpreadStat> {}

export interface IOrderKeyValue {
  key: string;
  value: IOrder;
}

export interface IHistoricalOrderStore extends EventEmitter {
  get(key: string): Promise<IOrder>;
  getAll(): Promise<IOrderKeyValue[]>;
  put(value: IOrder): Promise<string>;
  del(key: string): Promise<void>;
  delAll(): Promise<{}>;
}
