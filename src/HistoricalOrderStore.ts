import { ChronoDB, TimeSeries } from "@bitr/chronodb";
import { EventEmitter } from "events";
import { reviveOrder } from "./OrderImpl";
import { IHistoricalOrderStore, IOrder } from "./types";

class EmittableHistoricalOrderStore extends EventEmitter implements IHistoricalOrderStore {
  private readonly timeSeries: TimeSeries<IOrder>;

  constructor(chronoDB: ChronoDB) {
    super();
    this.timeSeries = chronoDB.getTimeSeries<IOrder>("HistoricalOrder", (order) => reviveOrder(order));
  }

  public get(key: string): Promise<IOrder> {
    return this.timeSeries.get(key);
  }

  public getAll(): Promise<{ key: string; value: IOrder }[]> {
    return this.timeSeries.getAll();
  }

  public put(value: IOrder): Promise<string> {
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

export const getHistoricalOrderStore = (chronoDB: ChronoDB): IHistoricalOrderStore =>
  new EmittableHistoricalOrderStore(chronoDB);
