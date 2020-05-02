import {cast, Castable} from "@bitr/castable";

export class AccountBalance extends Castable {
    @cast public currency: string;
    @cast public balance: number;
}

export type AccountBalanceResponse = AccountBalance[];

export interface ICashMarginTypeStrategy {
    getBtcPosition(): Promise<number>;
}
