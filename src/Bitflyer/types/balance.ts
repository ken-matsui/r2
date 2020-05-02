// tslint:disable:variable-name

import {cast, Castable} from "@bitr/castable";

export class Balance extends Castable {
    @cast public currency_code: string;
    @cast public amount: number;
    @cast public available: number;
}

export type BalanceResponse = Balance[];
