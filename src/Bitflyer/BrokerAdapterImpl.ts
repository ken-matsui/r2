import { getLogger } from "@bitr/logger";
import * as _ from "lodash";
import {
  CashMarginType,
  IBrokerAdapter,
  IBrokerConfigType,
  IExecution,
  IOrder,
  IQuote,
  OrderSide,
  OrderStatus,
  OrderType,
  QuoteSide,
  TimeInForce,
} from "../types";
import { eRound, toExecution } from "../util";
import BrokerApi from "./BrokerApi";
import { BoardResponse, ChildOrder, IChildOrdersParam, ISendChildOrderRequest } from "./types";

export default class BrokerAdapterImpl implements IBrokerAdapter {
  public readonly broker = "Bitflyer";
  private readonly brokerApi: BrokerApi;
  private readonly log = getLogger("Bitflyer.BrokerAdapter");

  constructor(private readonly config: IBrokerConfigType) {
    this.brokerApi = new BrokerApi(this.config.key, this.config.secret);
  }

  public async send(order: IOrder): Promise<void> {
    if (order.broker !== this.broker) {
      throw new Error();
    }
    const param = this.mapOrderToSendChildOrderRequest(order);
    const reply = await this.brokerApi.sendChildOrder(param);
    order.brokerOrderId = reply.child_order_acceptance_id;
    order.status = OrderStatus.New;
    order.sentTime = new Date();
    order.lastUpdated = new Date();
  }

  public async refresh(order: IOrder): Promise<void> {
    const orderId = order.brokerOrderId;
    const request: IChildOrdersParam = { child_order_acceptance_id: orderId };
    const reply = await this.brokerApi.getChildOrders(request);
    const childOrder = reply[0];
    if (childOrder === undefined) {
      const message = `Unable to find ${orderId}. GetOrderState failed.`;
      this.log.warn(message);
      return;
    }

    this.setOrderFields(childOrder, order);
    const executions = await this.brokerApi.getExecutions({ child_order_acceptance_id: orderId });
    order.executions = _.map(executions, (x) => {
      const e = toExecution(order);
      e.size = x.size;
      e.price = x.price;
      e.execTime = new Date(x.exec_date);
      return e as IExecution;
    });

    order.lastUpdated = new Date();
  }

  public async cancel(order: IOrder): Promise<void> {
    let productCode = "";
    switch (order.symbol) {
      case "BTC/JPY":
        productCode = "BTC_JPY";
        break;
      default:
        throw new Error("Not implemented.");
    }
    const request = { product_code: productCode, child_order_acceptance_id: order.brokerOrderId };
    await this.brokerApi.cancelChildOrder(request);
    order.lastUpdated = new Date();
    order.status = OrderStatus.Canceled;
  }

  public async getBtcPosition(): Promise<number> {
    const balanceResponse = await this.brokerApi.getBalance();
    const btcBalance = _.find(balanceResponse, (b) => b.currency_code === "BTC");
    if (!btcBalance) {
      throw new Error("Btc balance is not found.");
    }
    return btcBalance.amount;
  }

  public async fetchQuotes(): Promise<IQuote[]> {
    const response = await this.brokerApi.getBoard();
    return this.mapToQuote(response);
  }

  private mapOrderToSendChildOrderRequest(order: IOrder): ISendChildOrderRequest {
    if (order.cashMarginType !== CashMarginType.Cash) {
      throw new Error("Not implemented.");
    }

    let productCode = "";
    switch (order.symbol) {
      case "BTC/JPY":
        productCode = "BTC_JPY";
        break;
      default:
        throw new Error("Not implemented.");
    }

    let price = 0;
    let childOrderType = "";
    switch (order.type) {
      case OrderType.Limit:
        childOrderType = "LIMIT";
        price = order.price;
        break;
      case OrderType.Market:
        childOrderType = "MARKET";
        price = 0;
        break;
      default:
        throw new Error("Not implemented.");
    }

    let timeInForce;
    switch (order.timeInForce) {
      case TimeInForce.None:
        timeInForce = "";
        break;
      case TimeInForce.Fok:
        timeInForce = "FOK";
        break;
      case TimeInForce.Ioc:
        timeInForce = "IOC";
        break;
      default:
        throw new Error("Not implemented.");
    }

    return {
      price,
      product_code: productCode,
      child_order_type: childOrderType,
      side: OrderSide[order.side].toUpperCase(),
      size: order.size,
      time_in_force: timeInForce,
    };
  }

  private setOrderFields(childOrder: ChildOrder, order: IOrder): void {
    order.filledSize = eRound(childOrder.executed_size);
    if (childOrder.child_order_state === "CANCELED") {
      order.status = OrderStatus.Canceled;
    } else if (childOrder.child_order_state === "EXPIRED") {
      order.status = OrderStatus.Expired;
    } else if (order.filledSize === order.size) {
      order.status = OrderStatus.Filled;
    } else if (order.filledSize > 0) {
      order.status = OrderStatus.PartiallyFilled;
    }
    order.lastUpdated = new Date();
  }

  private mapToQuote(boardResponse: BoardResponse): IQuote[] {
    const asks = _(boardResponse.asks)
      .take(100)
      .map((q) => {
        return { broker: this.broker, side: QuoteSide.Ask, price: Number(q.price), volume: Number(q.size) };
      })
      .value();
    const bids = _(boardResponse.bids)
      .take(100)
      .map((q) => {
        return { broker: this.broker, side: QuoteSide.Bid, price: Number(q.price), volume: Number(q.size) };
      })
      .value();
    return _.concat(asks, bids);
  }
} /* istanbul ignore next */
