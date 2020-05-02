// tslint:disable:max-classes-per-file

import { getLogger } from "@bitr/logger";
import * as _ from "lodash";
import t from "./intl";
import { calcProfit } from "./pnl";
import PositionService from "./PositionService";
import {
  IConfigStore,
  ILimitChecker,
  ILimitCheckResult,
  ISpreadAnalysisResult,
  OrderPair,
} from "./types";

export default class MainLimitChecker implements ILimitChecker {
  private readonly log = getLogger(this.constructor.name);
  private readonly limits: ILimitChecker[];

  constructor(
    configStore: IConfigStore,
    positionService: PositionService,
    spreadAnalysisResult: ISpreadAnalysisResult,
    orderPair?: OrderPair,
  ) {
    if (orderPair) {
      this.limits = [
        new MinExitTargetProfitLimit(configStore, spreadAnalysisResult, orderPair),
        new MaxNetExposureLimit(configStore, positionService),
        new MaxTargetProfitLimit(configStore, spreadAnalysisResult),
        new MaxTargetVolumeLimit(configStore, spreadAnalysisResult),
        new DemoModeLimit(configStore),
      ];
    } else {
      this.limits = [
        new MaxNetExposureLimit(configStore, positionService),
        new InvertedSpreadLimit(spreadAnalysisResult),
        new MinTargetProfitLimit(configStore, spreadAnalysisResult),
        new MaxTargetProfitLimit(configStore, spreadAnalysisResult),
        new MaxTargetVolumeLimit(configStore, spreadAnalysisResult),
        new DemoModeLimit(configStore),
      ];
    }
  }

  public check(): ILimitCheckResult {
    for (const limit of this.limits) {
      const result = limit.check();
      this.log.debug(`${limit.constructor.name} ${result.success ? "passed" : "violated"}`);
      if (!result.success) {
        return result;
      }
    }
    return { success: true, reason: "", message: "" };
  }
}

class MinExitTargetProfitLimit implements ILimitChecker {
  private readonly log = getLogger(this.constructor.name);

  constructor(
    private readonly configStore: IConfigStore,
    private readonly spreadAnalysisResult: ISpreadAnalysisResult,
    private readonly orderPair: OrderPair,
  ) {}

  public check(): ILimitCheckResult {
    const success = this.isExitProfitLargeEnough();
    if (success) {
      return { success, reason: "", message: "" };
    }
    const reason = "Too small exit profit";
    const message = t`TargetProfitIsSmallerThanMinProfit`;
    return { success, reason, message };
  }

  private isExitProfitLargeEnough(): boolean {
    const effectiveValue = this.getEffectiveMinExitTargetProfit();
    this.log.debug(`effectiveMinExitTargetProfit: ${effectiveValue}`);
    return this.spreadAnalysisResult.targetProfit >= effectiveValue;
  }

  private getEffectiveMinExitTargetProfit() {
    const pair = this.orderPair;
    const { bid, ask, targetVolume } = this.spreadAnalysisResult;
    const targetVolumeNotional = _.mean([ask.price, bid.price]) * targetVolume;
    const { minExitTargetProfit, minExitTargetProfitPercent, exitNetProfitRatio } = this.configStore.config;
    const openProfit = calcProfit(pair, this.configStore.config).profit;
    return _.max([
      minExitTargetProfit,
      minExitTargetProfitPercent !== undefined
        ? _.round(minExitTargetProfitPercent / 100 * targetVolumeNotional)
        : Number.MIN_SAFE_INTEGER,
      exitNetProfitRatio !== undefined ? openProfit * (exitNetProfitRatio / 100 - 1) : Number.MIN_SAFE_INTEGER,
    ]) as number;
  }
}

class MaxNetExposureLimit implements ILimitChecker {
  constructor(private readonly configStore: IConfigStore, private readonly positionService: PositionService) {}

  public check(): ILimitCheckResult {
    const success = Math.abs(this.positionService.netExposure) <= this.configStore.config.maxNetExposure;
    if (success) {
      return { success, reason: "", message: "" };
    }
    const reason = "Max exposure breached";
    const message = t`NetExposureIsLargerThanMaxNetExposure`;
    return { success, reason, message };
  }
}

class InvertedSpreadLimit implements ILimitChecker {
  constructor(private readonly spreadAnalysisResult: ISpreadAnalysisResult) {}

  public check() {
    const success = this.spreadAnalysisResult.invertedSpread > 0;
    if (success) {
      return { success, reason: "", message: "" };
    }
    const reason = "Spread not inverted";
    const message = t`NoArbitrageOpportunitySpreadIsNotInverted`;
    return { success, reason, message };
  }
}

class MinTargetProfitLimit implements ILimitChecker {
  constructor(
      private readonly configStore: IConfigStore,
      private readonly spreadAnalysisResult: ISpreadAnalysisResult
  ) {}

  public check() {
    const success = this.isTargetProfitLargeEnough();
    if (success) {
      return { success, reason: "", message: "" };
    }
    const reason = "Too small profit";
    const message = t`TargetProfitIsSmallerThanMinProfit`;
    return { success, reason, message };
  }

  private isTargetProfitLargeEnough(): boolean {
    const config = this.configStore.config;
    const { bid, ask, targetVolume, targetProfit } = this.spreadAnalysisResult;
    const targetVolumeNotional = _.mean([ask.price, bid.price]) * targetVolume;
    const effectiveMinTargetProfit = _.max([
      config.minTargetProfit,
      config.minTargetProfitPercent !== undefined
        ? _.round(config.minTargetProfitPercent / 100 * targetVolumeNotional)
        : 0,
    ]) as number;
    return targetProfit >= effectiveMinTargetProfit;
  }
}

class MaxTargetProfitLimit implements ILimitChecker {
  constructor(
      private readonly configStore: IConfigStore,
      private readonly spreadAnalysisResult: ISpreadAnalysisResult,
  ) {}

  public check() {
    const success = this.isProfitSmallerThanLimit();
    if (success) {
      return { success, reason: "", message: "" };
    }
    const reason = "Too large profit";
    const message = t`TargetProfitIsLargerThanMaxProfit`;
    return { success, reason, message };
  }

  private isProfitSmallerThanLimit(): boolean {
    const { config } = this.configStore;
    const { bid, ask, targetVolume, targetProfit } = this.spreadAnalysisResult;
    const maxTargetProfit = _.min([
      config.maxTargetProfit,
      config.maxTargetProfitPercent !== undefined
        ? _.round(config.maxTargetProfitPercent / 100 * _.mean([ask.price, bid.price]) * targetVolume)
        : Number.MAX_SAFE_INTEGER,
    ]) as number;
    return targetProfit <= maxTargetProfit;
  }
}

class MaxTargetVolumeLimit implements ILimitChecker {
  constructor(
      private readonly configStore: IConfigStore,
      private readonly spreadAnalysisResult: ISpreadAnalysisResult,
  ) {}

  public check() {
    const success = this.isVolumeSmallerThanLimit();
    if (success) {
      return { success, reason: "", message: "" };
    }
    const reason = "Too large Volume";
    const message = t`TargetVolumeIsLargerThanMaxTargetVolumePercent`;
    return { success, reason, message };
  }

  private isVolumeSmallerThanLimit(): boolean {
    const { config } = this.configStore;
    const { availableVolume, targetVolume } = this.spreadAnalysisResult;
    const maxTargetVolume = _.min([
      config.maxTargetVolumePercent !== undefined
        ? config.maxTargetVolumePercent / 100 * availableVolume
        : Number.MAX_SAFE_INTEGER,
    ]) as number;
    return targetVolume <= maxTargetVolume;
  }
}

class DemoModeLimit implements ILimitChecker {
  constructor(private readonly configStore: IConfigStore) {}

  public check() {
    const success = !this.configStore.config.demoMode;
    if (success) {
      return { success, reason: "", message: "" };
    }
    const reason = "Demo mode";
    const message = t`ThisIsDemoModeNotSendingOrders`;
    return { success, reason, message };
  }
}
