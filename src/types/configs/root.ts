import {cast, Castable, element} from "@bitr/castable";
import {AnalyticsConfig} from "./analytics";
import {BrokerConfig} from "./broker";
import {LoggingConfig} from "./logging";
import {OnSingleLegConfig} from "./onSingleLeg";
import {StabilityTrackerConfig} from "./stabilityTracker";
import {WebGatewayConfig} from "./webGateway";

export class RootConfig extends Castable {
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
