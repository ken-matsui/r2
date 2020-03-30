import { EventEmitter } from "events";
import { inject, injectable } from "inversify";
import _ = require("lodash");
import OrderImpl, { IOrderInit } from "./OrderImpl";
import symbols from "./symbols";
import { HistoricalOrderStore } from "./types";

@injectable()
export default class OrderService extends EventEmitter {
  public orders: OrderImpl[] = [];

  constructor(@inject(symbols.HistoricalOrderStore) private readonly historicalOrderStore: HistoricalOrderStore) {
    super();
  }

  public createOrder(init: IOrderInit): OrderImpl {
    const order = new OrderImpl(init);
    this.orders.push(order);
    this.emit("orderCreated", order);
    return order;
  }

  public emitOrderUpdated(order: OrderImpl) {
    this.emit("orderUpdated", order);
  }

  public async finalizeOrder(order: OrderImpl): Promise<void> {
    await this.historicalOrderStore.put(order);
    _.pull(this.orders, order);
    this.emit("orderFinalized", order);
  }
} /* istanbul ignore next */
