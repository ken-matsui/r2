import { injectable, inject } from 'inversify';
import symbols from './symbols';
import { IConfigStore, ISpreadAnalysisResult, ILimitChecker, OrderPair } from './types';
import PositionService from './PositionService';
import MainLimitChecker from './MainLimitChecker';

@injectable()
export default class LimitCheckerFactory {
  constructor(
    @inject(symbols.ConfigStore) private readonly configStore: IConfigStore,
    private readonly positionService: PositionService
  ) {}

  create(spreadAnalysisResult: ISpreadAnalysisResult, orderPair?: OrderPair): ILimitChecker {
    return new MainLimitChecker(
      this.configStore,
      this.positionService,
      spreadAnalysisResult,
      orderPair
    );
  }
} /* istanbul ignore next */
