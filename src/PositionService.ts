import { getLogger } from "@bitr/logger";
import Decimal from "decimal.js";
import { EventEmitter } from "events";
import { inject, injectable } from "inversify";
import * as _ from "lodash";
import BrokerAdapterRouter from "./BrokerAdapterRouter";
import BrokerStabilityTracker from "./BrokerStabilityTracker";
import t from "./intl";
import symbols from "./symbols";
import { BrokerConfig, IBrokerMap, IBrokerPosition, IConfigStore } from "./types";
import { eRound, hr, padEnd, padStart, splitSymbol } from "./util";

@injectable()
export default class PositionService extends EventEmitter {
  private readonly log = getLogger(this.constructor.name);
  private timer;
  private isRefreshing: boolean;
  private positionMapV: IBrokerMap<IBrokerPosition>;

  constructor(
    @inject(symbols.ConfigStore) private readonly configStore: IConfigStore,
    private readonly brokerAdapterRouter: BrokerAdapterRouter,
    private readonly brokerStabilityTracker: BrokerStabilityTracker,
  ) {
    super();
  }

  public async start(): Promise<void> {
    this.log.debug("Starting PositionService...");
    this.timer = setInterval(() => this.refresh(), this.configStore.config.positionRefreshInterval);
    await this.refresh();
    this.log.debug("Started PositionService.");
  }

  public async stop(): Promise<void> {
    this.log.debug("Stopping PositionService...");
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.log.debug("Stopped PositionService.");
  }

  public print(): void {
    const { baseCcy } = splitSymbol(this.configStore.config.symbol);
    const isOk = (b) => (b ? "OK" : "NG");
    const formatBrokerPosition = (brokerPosition: IBrokerPosition) =>
      `${padEnd(brokerPosition.broker, 10)}: ${padStart(_.round(brokerPosition.baseCcyPosition, 3), 6)} ${baseCcy}, ` +
      `${t`LongAllowed`}: ${isOk(brokerPosition.longAllowed)}, ` +
      `${t`ShortAllowed`}: ${isOk(brokerPosition.shortAllowed)}`;

    this.log.info({ hidden: true }, hr(21) + "POSITION" + hr(21));
    this.log.info({ hidden: true }, `Net Exposure: ${_.round(this.netExposure, 3)} ${baseCcy}`);
    _.each(this.positionMap, (position: IBrokerPosition) => {
      const stability = this.brokerStabilityTracker.stability(position.broker);
      this.log.info({ hidden: true }, `${formatBrokerPosition(position)} (Stability: ${stability})`);
    });
    this.log.info({ hidden: true }, hr(50));
    this.log.debug(JSON.stringify(this.positionMap));
  }

  get netExposure() {
    return eRound(_.sumBy(_.values(this.positionMap), (p: IBrokerPosition) => p.baseCcyPosition));
  }

  get positionMap() {
    return this.positionMapV;
  }

  private async refresh(): Promise<void> {
    this.log.debug("Refreshing positions...");
    if (this.isRefreshing) {
      this.log.debug("Already refreshing.");
      return;
    }
    try {
      this.isRefreshing = true;
      const config = this.configStore.config;
      const brokerConfigs = config.brokers.filter((b) => b.enabled);
      const promises = brokerConfigs.map((brokerConfig) => this.getBrokerPosition(brokerConfig, config.minSize));
      const brokerPositions = await Promise.all(promises);
      this.positionMapV = _(brokerPositions)
        .map((p: IBrokerPosition) => [p.broker, p])
        .fromPairs()
        .value();
      await this.emit("positionUpdated", this.positionMap);
    } catch (ex) {
      this.log.error(ex.message);
      this.log.debug(ex.stack);
    } finally {
      this.isRefreshing = false;
      this.log.debug("Finished refresh.");
    }
  }

  private async getBrokerPosition(brokerConfig: BrokerConfig, minSize: number): Promise<IBrokerPosition> {
    const { baseCcy } = splitSymbol(this.configStore.config.symbol);
    const positions = await this.brokerAdapterRouter.getPositions(brokerConfig.broker);
    const baseCcyPosition = positions.get(baseCcy);
    if (baseCcyPosition === undefined) {
      throw new Error(`Unable to find base ccy position in ${brokerConfig.broker}. ${JSON.stringify([...positions])}`);
    }
    const allowedLongSize = _.max([
      0,
      new Decimal(brokerConfig.maxLongPosition).minus(baseCcyPosition).toNumber(),
    ]) as number;
    const allowedShortSize = _.max([
      0,
      new Decimal(brokerConfig.maxShortPosition).plus(baseCcyPosition).toNumber(),
    ]) as number;
    const isStable = this.brokerStabilityTracker.isStable(brokerConfig.broker);
    return {
      allowedLongSize,
      allowedShortSize,
      baseCcyPosition,
      broker: brokerConfig.broker,
      longAllowed: new Decimal(allowedLongSize).gte(minSize) && isStable,
      shortAllowed: new Decimal(allowedShortSize).gte(minSize) && isStable,
    };
  }
} /* istanbul ignore next */
