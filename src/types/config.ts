import { cast, Castable, element } from "@bitr/castable";
import { CashMarginType } from "./index";

export interface IBrokerConfigType {
  broker: string;
  npmPath?: string;
  enabled: boolean;
  key: string;
  secret: string;
  maxLongPosition: number;
  maxShortPosition: number;
  cashMarginType: CashMarginType;
  leverageLevel: number;
  commissionPercent: number;
}

export class BrokerConfig extends Castable implements IBrokerConfigType {
  @cast public broker: string;
  @cast public npmPath?: string;
  @cast public enabled: boolean;
  @cast public key: string;
  @cast public secret: string;
  @cast public maxLongPosition: number;
  @cast public maxShortPosition: number;
  @cast public cashMarginType: CashMarginType;
  @cast public leverageLevel: number;
  @cast public commissionPercent: number;
  @cast @element(Array, String) public noTradePeriods: string[][];
}

export class SlackConfig extends Castable {
  @cast public enabled: boolean;
  @cast public url: string;
  @cast public channel: string;
  @cast public username: string;
  @cast
  @element(String)
  public keywords: string[];
}

export class LineConfig extends Castable {
  @cast public enabled: boolean;
  @cast public token: string;
  @cast
  @element(String)
  public keywords: string[];
}

export class LoggingConfig extends Castable {
  @cast public slack: SlackConfig;
  @cast public line: LineConfig;
}

export class OnSingleLegConfig extends Castable {
  @cast public action: "Cancel" | "Reverse" | "Proceed";
  @cast public actionOnExit: "Cancel" | "Reverse" | "Proceed";
  @cast public options: ICancelOption | ReverseOption | ProceedOption;
}

export interface ICancelOption {}

export class ReverseOption extends Castable {
  @cast public limitMovePercent: number;
  @cast public ttl: number;
}

export class ProceedOption extends Castable {
  @cast public limitMovePercent: number;
  @cast public ttl: number;
}

export class AnalyticsConfig extends Castable {
  @cast public enabled: boolean;
  @cast public plugin: string;
  @cast public initialHistory: object;
}

export class WebGatewayConfig extends Castable {
  @cast public enabled: boolean;
  @cast public host: string;
  @cast public openBrowser: boolean;
}

export class StabilityTrackerConfig extends Castable {
  @cast public threshold: number;
  @cast public recoveryInterval: number;
}

export class ConfigRoot extends Castable {
  @cast public language: string;
  @cast public demoMode: boolean;
  @cast public symbol: string;
  @cast public priceMergeSize: number;
  @cast public maxSize: number;
  @cast public minSize: number;
  @cast public minTargetProfit: number;
  @cast public minExitTargetProfit: number;
  @cast public minTargetProfitPercent: number;
  @cast public minExitTargetProfitPercent: number;
  @cast public exitNetProfitRatio: number;
  @cast public maxTargetProfit: number;
  @cast public maxTargetProfitPercent: number;
  @cast public maxTargetVolumePercent: number;
  @cast public acceptablePriceRange: number;
  @cast public iterationInterval: number;
  @cast public positionRefreshInterval: number;
  @cast public sleepAfterSend: number;
  @cast public maxNetExposure: number;
  @cast public maxRetryCount: number;
  @cast public orderStatusCheckInterval: number;
  @cast public stabilityTracker: StabilityTrackerConfig;
  @cast public onSingleLeg: OnSingleLegConfig;
  @cast public analytics: AnalyticsConfig;
  @cast public webGateway: WebGatewayConfig;
  @cast
  @element(BrokerConfig)
  public brokers: BrokerConfig[];
  @cast public logging: LoggingConfig;
}
