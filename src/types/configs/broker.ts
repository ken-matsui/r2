import { cast, Castable, element } from "@bitr/castable";
import { CashMarginType } from "../index";

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
