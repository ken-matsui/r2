import {cast, Castable} from "@bitr/castable";

export class WebGatewayConfig extends Castable {
  @cast enabled: boolean;
}
