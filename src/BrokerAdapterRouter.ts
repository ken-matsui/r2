import { getLogger } from "@bitr/logger";
import { inject, injectable, multiInject } from "inversify";
import * as _ from "lodash";
import BrokerStabilityTracker from "./BrokerStabilityTracker";
import OrderImpl from "./OrderImpl";
import OrderService from "./OrderService";
import symbols from "./symbols";
import { Broker, IBrokerAdapter, IBrokerMap, IConfigStore, IOrder, IQuote } from "./types";

@injectable()
export default class BrokerAdapterRouter {
  private readonly log = getLogger(this.constructor.name);
  private readonly brokerAdapterMap: IBrokerMap<IBrokerAdapter>;

  constructor(
    @multiInject(symbols.BrokerAdapter) brokerAdapters: IBrokerAdapter[],
    private readonly brokerStabilityTracker: BrokerStabilityTracker,
    @inject(symbols.ConfigStore) private readonly configStore: IConfigStore,
    private readonly orderService: OrderService,
  ) {
    this.brokerAdapterMap = _.keyBy(brokerAdapters, (x) => x.broker);
  }

  public async send(order: IOrder): Promise<void> {
    this.log.debug(order.toString());
    try {
      await this.brokerAdapterMap[order.broker].send(order);
      this.orderService.emitOrderUpdated(order as OrderImpl);
    } catch (ex) {
      this.brokerStabilityTracker.decrement(order.broker);
      throw ex;
    }
  }

  public async cancel(order: IOrder): Promise<void> {
    this.log.debug(order.toString());
    await this.brokerAdapterMap[order.broker].cancel(order);
    this.orderService.emitOrderUpdated(order as OrderImpl);
  }

  public async refresh(order: IOrder): Promise<void> {
    this.log.debug(order.toString());
    await this.brokerAdapterMap[order.broker].refresh(order);
    this.orderService.emitOrderUpdated(order as OrderImpl);
  }

  public async getPositions(broker: Broker): Promise<Map<string, number>> {
    try {
      // for backword compatibility, use getBtcPosition if getPositions is not defined
      if (!_.isFunction(this.brokerAdapterMap[broker].getPositions) && this.configStore.config.symbol === "BTC/JPY") {
        const btcPosition = await this.brokerAdapterMap[broker].getBtcPosition();
        return new Map<string, number>([["BTC", btcPosition]]);
      }
      if (this.brokerAdapterMap[broker].getPositions !== undefined) {
        return await (this.brokerAdapterMap[broker].getPositions as () => Promise<Map<string, number>>)();
      }
      throw new Error("Unable to find a method to get positions.");
    } catch (ex) {
      this.brokerStabilityTracker.decrement(broker);
      throw ex;
    }
  }

  public async fetchQuotes(broker: Broker): Promise<IQuote[]> {
    try {
      return await this.brokerAdapterMap[broker].fetchQuotes();
    } catch (ex) {
      this.brokerStabilityTracker.decrement(broker);
      this.log.error(ex.message);
      this.log.debug(ex.stack);
      return [];
    }
  }
} /* istanbul ignore next */
