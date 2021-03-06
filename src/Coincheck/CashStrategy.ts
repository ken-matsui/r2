import { CashMarginType, IOrder, OrderSide, OrderStatus, OrderType } from "../types";
import BrokerApi from "./BrokerApi";
import { ICashMarginTypeStrategy } from "./types";

export default class CashStrategy implements ICashMarginTypeStrategy {
  constructor(private readonly brokerApi: BrokerApi) {}

  public async send(order: IOrder): Promise<void> {
    if (order.cashMarginType !== CashMarginType.Cash) {
      throw new Error();
    }
    const request = {
      pair: "btc_jpy",
      order_type: this.getBrokerOrderType(order),
      amount: order.size,
      rate: order.price,
    };
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
    return (await this.brokerApi.getAccountsBalance()).btc;
  }

  private getBrokerOrderType(order: IOrder): string {
    switch (order.side) {
      case OrderSide.Buy:
        switch (order.type) {
          case OrderType.Market:
            return "market_buy";
          case OrderType.Limit:
            return "buy";
          default:
            throw new Error();
        }
      case OrderSide.Sell:
        switch (order.type) {
          case OrderType.Market:
            return "market_sell";
          case OrderType.Limit:
            return "sell";
          default:
            throw new Error();
        }
      default:
        throw new Error();
    }
  }
}
