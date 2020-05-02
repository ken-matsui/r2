import {cast, Castable} from "@bitr/castable";

export class Balance extends Castable {
    // tslint:disable-next-line:variable-name
    @cast public currency_code: string;
    @cast public amount: number;
    @cast public available: number;
}

export type BalanceResponse = Balance[];
