import { getLogger } from "@bitr/logger";
import { addMinutes } from "date-fns";
import * as _ from "lodash";
import {
  CashMarginType,
  IBrokerAdapter,
  IBrokerConfigType,
  IExecution,
  IOrder,
  IQuote,
  OrderStatus,
  QuoteSide,
} from "../types";
import { almostEqual, eRound, toExecution, toQuote } from "../util";
import BrokerApi from "./BrokerApi";
import CashStrategy from "./CashStrategy";
import MarginOpenStrategy from "./MarginOpenStrategy";
import NetOutStrategy from "./NetOutStrategy";
import { CashMarginTypeStrategy, OrderBooksResponse } from "./types";

export default class BrokerAdapterImpl implements IBrokerAdapter {
  public readonly broker = "Coincheck";
  public readonly strategyMap: Map<CashMarginType, CashMarginTypeStrategy>;
  private readonly brokerApi: BrokerApi;
  private readonly log = getLogger("Coincheck.BrokerAdapter");

  constructor(private readonly config: IBrokerConfigType) {
    this.brokerApi = new BrokerApi(this.config.key, this.config.secret);
    this.strategyMap = new Map<CashMarginType, CashMarginTypeStrategy>([
      [CashMarginType.Cash, new CashStrategy(this.brokerApi)],
      [CashMarginType.MarginOpen, new MarginOpenStrategy(this.brokerApi)],
      [CashMarginType.NetOut, new NetOutStrategy(this.brokerApi)],
    ]);
  }

  public async getBtcPosition(): Promise<number> {
    const strategy = this.strategyMap.get(this.config.cashMarginType);
    if (strategy === undefined) {
      throw new Error(`Unable to find a strategy for ${this.config.cashMarginType}.`);
    }
    return await strategy.getBtcPosition();
  }

  public async fetchQuotes(): Promise<IQuote[]> {
    const response = await this.brokerApi.getOrderBooks();
    return this.mapToQuote(response);
  }

  public async send(order: IOrder): Promise<void> {
    if (order.broker !== this.broker) {
      throw new Error();
    }
    const strategy = this.strategyMap.get(order.cashMarginType);
    if (strategy === undefined) {
      throw new Error(`Unable to find a strategy for ${order.cashMarginType}.`);
    }
    await strategy.send(order);
  }

  public async cancel(order: IOrder): Promise<void> {
    const orderId = order.brokerOrderId;
    const reply = await this.brokerApi.cancelOrder(orderId);
    if (!reply.success) {
      throw new Error(`Cancel ${orderId} failed.`);
    }
    order.lastUpdated = new Date();
    order.status = OrderStatus.Canceled;
  }

  public async refresh(order: IOrder): Promise<void> {
    const reply = await this.brokerApi.getOpenOrders();
    const brokerOrder = _.find(reply.orders, (o) => o.id === order.brokerOrderId);
    if (brokerOrder !== undefined) {
      if (brokerOrder.pending_amount === undefined || brokerOrder.pending_amount === 0) {
        throw new Error("Unexpected reply returned.");
      }
      order.filledSize = eRound(order.size - brokerOrder.pending_amount);
      if (order.filledSize > 0) {
        order.status = OrderStatus.PartiallyFilled;
      }
      order.lastUpdated = new Date();
      return;
    }
    const from = addMinutes(order.creationTime, -1);
    const transactions = (await this.brokerApi.getTransactionsWithStartDate(from)).filter(
      (x) => x.order_id === order.brokerOrderId,
    );
    if (transactions.length === 0) {
      this.log.warn("The order is not found in pending orders and historical orders.");
      return;
    }
    order.executions = transactions.map((x) => {
      const execution = toExecution(order);
      execution.execTime = x.created_at;
      execution.price = x.rate;
      execution.size = Math.abs(x.funds.btc);
      return execution as IExecution;
    });
    order.filledSize = eRound(_.sumBy(order.executions, (x) => x.size));
    order.status = almostEqual(order.filledSize, order.size, 1) ? OrderStatus.Filled : OrderStatus.Canceled;
    order.lastUpdated = new Date();
  }

  private mapToQuote(orderBooksResponse: OrderBooksResponse): IQuote[] {
    const asks = _(orderBooksResponse.asks)
        .take(100)
        .map((q) => toQuote(this.broker, QuoteSide.Ask, q[0], q[1]))
        .value();
    const bids = _(orderBooksResponse.bids)
        .take(100)
        .map((q) => toQuote(this.broker, QuoteSide.Bid, q[0], q[1]))
        .value();
    return _.concat(asks, bids);
  }
} /* istanbul ignore next */
