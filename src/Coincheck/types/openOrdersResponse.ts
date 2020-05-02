import {cast, Castable, element} from "@bitr/castable";
import {OpenOrder} from "./openOrder";

export class OpenOrdersResponse extends Castable {
    @cast public success: boolean;
    @cast @element(OpenOrder) public orders: OpenOrder[];
}
