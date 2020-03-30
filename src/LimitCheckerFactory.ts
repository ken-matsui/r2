import { inject, injectable } from "inversify";
import MainLimitChecker from "./MainLimitChecker";
import PositionService from "./PositionService";
import symbols from "./symbols";
import { IConfigStore, ILimitChecker, ISpreadAnalysisResult, OrderPair } from "./types";

@injectable()
export default class LimitCheckerFactory {
  constructor(
    @inject(symbols.ConfigStore) private readonly configStore: IConfigStore,
    private readonly positionService: PositionService,
  ) {}

  public create(spreadAnalysisResult: ISpreadAnalysisResult, orderPair?: OrderPair): ILimitChecker {
    return new MainLimitChecker(
      this.configStore,
      this.positionService,
      spreadAnalysisResult,
      orderPair,
    );
  }
} /* istanbul ignore next */
