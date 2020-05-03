import {cast, Castable, element} from "@bitr/castable";
import {StabilityTrackerConfig} from "./stabilityTracker";
import {OnSingleLegConfig} from "./onSingleLeg";
import {AnalyticsConfig} from "./analytics";
import {WebGatewayConfig} from "./webGateway";
import {BrokerConfig} from "./broker";
import {LoggingConfig} from "./logging";

export class RootConfig extends Castable {
  @cast language: string;
  @cast demoMode: boolean;
  @cast symbol: string;
  @cast priceMergeSize: number;
  @cast maxSize: number;
  @cast minSize: number;
  @cast minTargetProfit: number;
  @cast minExitTargetProfit: number;
  @cast minTargetProfitPercent: number;
  @cast minExitTargetProfitPercent: number;
  @cast exitNetProfitRatio: number;
  @cast maxTargetProfit: number;
  @cast maxTargetProfitPercent: number;
  @cast maxTargetVolumePercent: number;
  @cast acceptablePriceRange: number;
  @cast iterationInterval: number;
  @cast positionRefreshInterval: number;
  @cast sleepAfterSend: number;
  @cast maxNetExposure: number;
  @cast maxRetryCount: number;
  @cast orderStatusCheckInterval: number;
  @cast stabilityTracker: StabilityTrackerConfig;
  @cast onSingleLeg: OnSingleLegConfig;
  @cast analytics: AnalyticsConfig;
  @cast webGateway: WebGatewayConfig;
  @cast @element(BrokerConfig) brokers: BrokerConfig[];
  @cast logging: LoggingConfig;
}
