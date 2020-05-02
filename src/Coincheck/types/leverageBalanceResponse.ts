import {cast, Castable} from "@bitr/castable";
import {Margin} from "./margin";
import {MarginAvailable} from "./marginAvailable";

export class LeverageBalanceResponse extends Castable {
    @cast public success: boolean;
    @cast public margin: Margin;
    // tslint:disable-next-line:variable-name
    @cast public margin_available: MarginAvailable;
    // tslint:disable-next-line:variable-name
    @cast public margin_level: number;
}
