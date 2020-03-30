import { AwaitableEventEmitter } from "@bitr/awaitable-event-emitter";
import { EventEmitter } from "events";
import { Container, decorate, injectable } from "inversify";
import { getActivePairStore } from "./ActivePairLevelStore";
import Arbitrager from "./Arbitrager";
import BrokerAdapterRouter from "./BrokerAdapterRouter";
import BrokerStabilityTracker from "./BrokerStabilityTracker";
import { getChronoDB } from "./chrono";
import ConfigValidator from "./ConfigValidator";
import { getHistoricalOrderStore } from "./HistoricalOrderStore";
import JsonConfigStore from "./JsonConfigStore";
import LimitCheckerFactory from "./LimitCheckerFactory";
import OppotunitySearcher from "./OpportunitySearcher";
import OrderService from "./OrderService";
import PairTrader from "./PairTrader";
import PositionService from "./PositionService";
import QuoteAggregator from "./QuoteAggregator";
import ReportService from "./ReportService";
import SingleLegHandler from "./SingleLegHandler";
import SpreadAnalyzer from "./SpreadAnalyzer";
import { getSpreadStatTimeSeries } from "./SpreadStatTimeSeries";
import symbols from "./symbols";
import { IActivePairStore, IConfigStore, IHistoricalOrderStore, ISpreadStatTimeSeries } from "./types";
import WebGateway from "./WebGateway";

decorate(injectable(), EventEmitter);
decorate(injectable(), AwaitableEventEmitter);

const container = new Container();
container.bind<Arbitrager>(Arbitrager).toSelf();
container
  .bind<IConfigStore>(symbols.ConfigStore)
  .to(JsonConfigStore)
  .inSingletonScope();
container
  .bind<QuoteAggregator>(QuoteAggregator)
  .toSelf()
  .inSingletonScope();
container
  .bind<PositionService>(PositionService)
  .toSelf()
  .inSingletonScope();
container
  .bind<BrokerAdapterRouter>(BrokerAdapterRouter)
  .toSelf()
  .inSingletonScope();
container.bind<SpreadAnalyzer>(SpreadAnalyzer).toSelf();
container
  .bind<ConfigValidator>(ConfigValidator)
  .toSelf()
  .inSingletonScope();
container
  .bind<LimitCheckerFactory>(LimitCheckerFactory)
  .toSelf()
  .inSingletonScope();
container
  .bind<OppotunitySearcher>(OppotunitySearcher)
  .toSelf()
  .inSingletonScope();
container
  .bind<PairTrader>(PairTrader)
  .toSelf()
  .inSingletonScope();
container
  .bind<SingleLegHandler>(SingleLegHandler)
  .toSelf()
  .inSingletonScope();
container
  .bind<BrokerStabilityTracker>(BrokerStabilityTracker)
  .toSelf()
  .inSingletonScope();
container
  .bind<ReportService>(ReportService)
  .toSelf()
  .inSingletonScope();
container
  .bind<WebGateway>(WebGateway)
  .toSelf()
  .inSingletonScope();
container.bind<IActivePairStore>(symbols.ActivePairStore).toConstantValue(getActivePairStore(getChronoDB()));
container
  .bind<ISpreadStatTimeSeries>(symbols.SpreadStatTimeSeries)
  .toConstantValue(getSpreadStatTimeSeries(getChronoDB()));
container
  .bind<IHistoricalOrderStore>(symbols.HistoricalOrderStore)
  .toConstantValue(getHistoricalOrderStore(getChronoDB()));
container
  .bind<OrderService>(OrderService)
  .toSelf()
  .inSingletonScope();

export default container;
