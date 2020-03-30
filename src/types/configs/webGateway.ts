import {cast, Castable} from "@bitr/castable";

export class WebGatewayConfig extends Castable {
    @cast public enabled: boolean;
    @cast public host: string;
    @cast public openBrowser: boolean;
}
