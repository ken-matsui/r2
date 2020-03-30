import { IHistoricalOrderStore, IOrder } from './types';
import { reviveOrder } from './OrderImpl';
import { ChronoDB, TimeSeries } from '@bitr/chronodb';
import { EventEmitter } from 'events';

class EmittableHistoricalOrderStore extends EventEmitter implements IHistoricalOrderStore {
  private readonly timeSeries: TimeSeries<IOrder>;

  constructor(chronoDB: ChronoDB) {
    super();
    this.timeSeries = chronoDB.getTimeSeries<IOrder>('HistoricalOrder', order => reviveOrder(order));
  }

  get(key: string): Promise<IOrder> {
    return this.timeSeries.get(key);
  }

  getAll(): Promise<{ key: string; value: IOrder }[]> {
    return this.timeSeries.getAll();
  }

  put(value: IOrder): Promise<string> {
    this.emit('change');
    return this.timeSeries.put(value);
  }

  del(key: string): Promise<void> {
    this.emit('change');
    return this.timeSeries.del(key);
  }

  delAll(): Promise<{}> {
    this.emit('change');
    return this.timeSeries.delAll();
  }
}

export const getHistoricalOrderStore = (chronoDB: ChronoDB): IHistoricalOrderStore =>
  new EmittableHistoricalOrderStore(chronoDB);
