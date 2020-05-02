import {cast, Castable} from "@bitr/castable";
import {ProceedOption, ReverseOption} from "../configs";

// tslint:disable-next-line:no-empty-interface
export interface ICancelOption {}

export class OnSingleLegConfig extends Castable {
    @cast public action: "Cancel" | "Reverse" | "Proceed";
    @cast public actionOnExit: "Cancel" | "Reverse" | "Proceed";
    @cast public options: ICancelOption | ReverseOption | ProceedOption;
}
