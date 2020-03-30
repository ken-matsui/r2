import {cast, Castable} from "@bitr/castable";

export class CancelOrderResponse extends Castable {
    @cast public success: boolean;
    @cast public id: string;
}
