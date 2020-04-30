import { ChronoDB, TimeSeries } from "@bitr/chronodb";
import { EventEmitter } from "events";
import { reviveOrder } from "./OrderImpl";
import { IActivePairStore, OrderPair } from "./types";

class EmittableActivePairStore extends EventEmitter implements IActivePairStore {
  public timeSeries: TimeSeries<OrderPair>;

  constructor(chronoDB: ChronoDB) {
    super();
    this.timeSeries = chronoDB.getTimeSeries<OrderPair>(
      "ActivePair",
      (orderPair) => orderPair.map((o) => reviveOrder(o)) as OrderPair,
    );
  }

  public get(key: string): Promise<OrderPair> {
    return this.timeSeries.get(key);
  }

  public getAll(): Promise<{ key: string; value: OrderPair }[]> {
    return this.timeSeries.getAll();
  }

  public put(value: OrderPair): Promise<string> {
    this.emit("change");
    return this.timeSeries.put(value);
  }

  public del(key: string): Promise<void> {
    this.emit("change");
    return this.timeSeries.del(key);
  }

  public delAll(): Promise<{}> {
    this.emit("change");
    return this.timeSeries.delAll();
  }
}

export const getActivePairStore = (chronoDB: ChronoDB): IActivePairStore => new EmittableActivePairStore(chronoDB);
