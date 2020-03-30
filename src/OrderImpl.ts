import * as _ from "lodash";
import { v4 as uuid } from "uuid";
import { Broker, CashMarginType, Execution, Order, OrderSide, OrderStatus, OrderType, TimeInForce } from "./types";
import { eRound, revive } from "./util";

export interface IOrderInit {
  symbol: string;
  broker: Broker;
  side: OrderSide;
  size: number;
  price: number;
  cashMarginType: CashMarginType;
  type: OrderType;
  leverageLevel: number;
}

export default class OrderImpl implements Order {
  public broker: Broker;
  public side: OrderSide;
  public size: number;
  public price: number;
  public cashMarginType: CashMarginType;
  public type: OrderType;
  public leverageLevel: number;
  public id: string = uuid();
  public symbol: string;
  public timeInForce: TimeInForce = TimeInForce.None;
  public brokerOrderId: string;
  public status: OrderStatus = OrderStatus.PendingNew;
  public filledSize = 0;
  public creationTime: Date = new Date();
  public sentTime: Date;
  public lastUpdated: Date;
  public executions: Execution[] = [];

  constructor(init: IOrderInit) {
    Object.assign(this, init);
  }

  get pendingSize(): number {
    return eRound(this.size - this.filledSize);
  }

  get averageFilledPrice(): number {
    return _.isEmpty(this.executions)
      ? 0
      : eRound(_.sumBy(
          this.executions,
          (x) => x.size * x.price) / _.sumBy(this.executions, (x) => x.size),
        );
  }

  get filled(): boolean {
    return this.status === OrderStatus.Filled;
  }

  get filledNotional(): number {
    return this.averageFilledPrice * this.filledSize;
  }
}

export function reviveOrder(o: Order): OrderImpl {
  const r = revive<OrderImpl, Order>(OrderImpl, o);
  r.creationTime = new Date(r.creationTime);
  r.sentTime = new Date(r.sentTime);
  return r;
}
