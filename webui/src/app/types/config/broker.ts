import {CashMarginType} from "../types";
import {cast, Castable, element} from "@bitr/castable";

export interface BrokerConfigType {
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

export class BrokerConfig extends Castable implements BrokerConfigType {
  @cast broker: string;
  @cast npmPath?: string;
  @cast enabled: boolean;
  @cast key: string;
  @cast secret: string;
  @cast maxLongPosition: number;
  @cast maxShortPosition: number;
  @cast cashMarginType: CashMarginType;
  @cast leverageLevel: number;
  @cast commissionPercent: number;
  @cast @element(Array, String) noTradePeriods: string[][];
}
