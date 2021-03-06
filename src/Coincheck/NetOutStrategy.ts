import * as _ from "lodash";
import { CashMarginType, IOrder, OrderSide, OrderStatus, OrderType } from "../types";
import { almostEqual, eRound } from "../util";
import BrokerApi from "./BrokerApi";
import { ICashMarginTypeStrategy, LeveragePosition, INewOrderRequest } from "./types";

export default class NetOutStrategy implements ICashMarginTypeStrategy {
  constructor(private readonly brokerApi: BrokerApi) {}

  public async send(order: IOrder): Promise<void> {
    if (order.cashMarginType !== CashMarginType.NetOut) {
      throw new Error();
    }
    const request = await this.getNetOutRequest(order);
    const reply = await this.brokerApi.newOrder(request);
    if (!reply.success) {
      throw new Error("Send failed.");
    }
    order.sentTime = reply.created_at;
    order.status = OrderStatus.New;
    order.brokerOrderId = reply.id;
    order.lastUpdated = new Date();
  }

  public async getBtcPosition(): Promise<number> {
    const positions = await this.brokerApi.getAllOpenLeveragePositions();
    const longPosition = _.sumBy(positions.filter((p) => p.side === "buy"), (p) => p.amount);
    const shortPosition = _.sumBy(positions.filter((p) => p.side === "sell"), (p) => p.amount);
    return eRound(longPosition - shortPosition);
  }

  private async getNetOutRequest(order: IOrder): Promise<INewOrderRequest> {
    const openPositions = await this.brokerApi.getAllOpenLeveragePositions();
    const targetSide = order.side === OrderSide.Buy ? "sell" : "buy";
    const candidates = _(openPositions)
      .filter((p) => p.side === targetSide)
      .filter((p) => almostEqual(p.amount, order.size, 1))
      .value();
    if (order.symbol !== "BTC/JPY") {
      throw new Error("Not supported");
    }
    const pair = "btc_jpy";
    const rate = order.type === OrderType.Market ? undefined : order.price;
    const request = { pair, rate };
    if (candidates.length === 0) {
      return {
        ...request,
        order_type: order.side === OrderSide.Buy ? "leverage_buy" : "leverage_sell",
        amount: order.size,
      };
    }
    const targetPosition = _.last(candidates) as LeveragePosition;
    return {
      ...request,
      order_type: order.side === OrderSide.Buy ? "close_short" : "close_long",
      amount: targetPosition.amount,
      position_id: Number(targetPosition.id),
    };
  }
}
