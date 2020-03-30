import Decimal from "decimal.js";
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
} from "../types";
import { timestampToDate, toExecution, toQuote } from "../util";
import BrokerApi from "./BrokerApi";
import CashStrategy from "./CashStrategy";
import NetOutStrategy from "./NetOutStrategy";
import { ICashMarginTypeStrategy, OrdersResponse, PriceLevelsResponse, ISendOrderRequest } from "./types";

export default class BrokerAdapterImpl implements IBrokerAdapter {
  public readonly broker = "Quoine";
  public readonly strategyMap: Map<CashMarginType, ICashMarginTypeStrategy>;
  private readonly brokerApi: BrokerApi;

  constructor(private readonly config: IBrokerConfigType) {
    this.brokerApi = new BrokerApi(this.config.key, this.config.secret);
    this.strategyMap = new Map<CashMarginType, ICashMarginTypeStrategy>([
      [CashMarginType.Cash, new CashStrategy(this.brokerApi)],
      [CashMarginType.NetOut, new NetOutStrategy(this.brokerApi)],
    ]);
  }

  public async send(order: IOrder): Promise<void> {
    if (order.broker !== this.broker) {
      throw new Error();
    }
    const request = this.mapOrderToSendOrderRequest(order);
    const response = await this.brokerApi.sendOrder(request);
    order.brokerOrderId = response.id.toString();
    order.status = OrderStatus.New;
    order.sentTime = new Date();
    order.lastUpdated = new Date();
  }

  public async refresh(order: IOrder): Promise<void> {
    const ordersResponse = await this.brokerApi.getOrders(order.brokerOrderId);
    this.setOrderFields(ordersResponse, order);
  }

  public async cancel(order: IOrder): Promise<void> {
    await this.brokerApi.cancelOrder(order.brokerOrderId);
    order.lastUpdated = new Date();
    order.status = OrderStatus.Canceled;
  }

  public async getBtcPosition(): Promise<number> {
    const strategy = this.strategyMap.get(this.config.cashMarginType);
    if (strategy === undefined) {
      throw new Error(`Unable to find a strategy for ${this.config.cashMarginType}.`);
    }
    return await strategy.getBtcPosition();
  }

  public async fetchQuotes(): Promise<IQuote[]> {
    const response = await this.brokerApi.getPriceLevels();
    return this.mapToQuote(response);
  }

  private mapOrderToSendOrderRequest(order: IOrder): ISendOrderRequest {
    let productId: string;
    switch (order.symbol) {
      case "BTC/JPY":
        productId = "5";
        break;
      default:
        throw new Error("Not implemented.");
    }

    let orderType: string;
    let price: number = 0;
    switch (order.type) {
      case OrderType.Limit:
        orderType = "limit";
        price = order.price;
        break;
      case OrderType.Market:
        orderType = "market";
        price = 0;
        break;
      default:
        throw new Error("Not implemented.");
    }

    let orderDirection: string | undefined;
    let leverageLevel: number | undefined;
    switch (order.cashMarginType) {
      case CashMarginType.Cash:
        orderDirection = undefined;
        leverageLevel = undefined;
        break;
      case CashMarginType.NetOut:
        orderDirection = "netout";
        leverageLevel = order.leverageLevel;
        break;
      default:
        throw new Error("Not implemented.");
    }

    return {
      order: {
        price,
        product_id: productId,
        order_direction: orderDirection,
        order_type: orderType,
        side: OrderSide[order.side].toLowerCase(),
        quantity: order.size,
        leverage_level: leverageLevel,
      },
    };
  }

  private setOrderFields(ordersResponse: OrdersResponse, order: IOrder) {
    order.brokerOrderId = ordersResponse.id.toString();
    order.filledSize = Number(ordersResponse.filled_quantity);
    order.creationTime = timestampToDate(ordersResponse.created_at);
    if (new Decimal(order.filledSize).eq(order.size)) {
      order.status = OrderStatus.Filled;
    } else if (order.filledSize > 0) {
      order.status = OrderStatus.PartiallyFilled;
    }
    order.executions = _.map(ordersResponse.executions, (x) => {
      const e = toExecution(order);
      e.price = Number(x.price);
      e.size = Number(x.quantity);
      e.execTime = timestampToDate(x.created_at);
      return e as IExecution;
    });
    order.lastUpdated = new Date();
  }

  private mapToQuote(priceLevelsResponse: PriceLevelsResponse): IQuote[] {
    const asks = _(priceLevelsResponse.sell_price_levels)
      .take(100)
      .map((q) => toQuote(this.broker, QuoteSide.Ask, Number(q[0]), Number(q[1])))
      .value();
    const bids = _(priceLevelsResponse.buy_price_levels)
      .take(100)
      .map((q) => toQuote(this.broker, QuoteSide.Bid, Number(q[0]), Number(q[1])))
      .value();
    return _.concat(asks, bids);
  }
} /* istanbul ignore next */
