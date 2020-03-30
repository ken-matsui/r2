import { inject, injectable } from "inversify";
import * as _ from "lodash";
import symbols from "./symbols";
import { Broker, IConfigStore } from "./types";

const MAX = 10;
const MIN = 1;

@injectable()
export default class BrokerStabilityTracker {
  private stabilityMap: Map<Broker, number>;
  private timer;

  constructor(@inject(symbols.ConfigStore) private readonly configStore: IConfigStore) {
    const brokers = this.configStore.config.brokers.map((b) => b.broker);
    this.stabilityMap = new Map<Broker, number>(brokers.map((b) => [b, MAX] as [string, number]));
  }

  public async start() {
    if (this.configStore.config.stabilityTracker) {
      const interval = this.configStore.config.stabilityTracker.recoveryInterval || 60 * 1000;
      this.timer = setInterval(() => this.recover(), interval);
    }
  }

  public async stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  public decrement(broker: Broker) {
    if (this.stabilityMap.has(broker)) {
      const counter = this.stability(broker);
      const newValue = counter - 1;
      this.stabilityMap.set(broker, _.clamp(newValue, MIN, MAX));
    }
  }

  public isStable(broker: Broker): boolean {
    if (!this.stabilityMap.has(broker)) {
      return false;
    }
    const counter = this.stability(broker);
    let threshold = 0;
    if (this.configStore.config.stabilityTracker) {
      threshold = this.configStore.config.stabilityTracker.threshold || 0;
    }
    return counter >= threshold;
  }

  public stability(broker: Broker): number {
    return this.stabilityMap.get(broker) as number;
  }

  private increment(broker: Broker) {
    const counter = this.stability(broker);
    const newValue = counter + 1;
    this.stabilityMap.set(broker, _.clamp(newValue, MIN, MAX));
  }

  private recover() {
    const brokers = this.configStore.config.brokers.map((b) => b.broker);
    for (const broker of brokers) {
      this.increment(broker);
    }
  }
} /* istanbul ignore next */
