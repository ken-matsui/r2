import {cast, Castable, element} from "@bitr/castable";

export class SlackConfig extends Castable {
  @cast enabled: boolean;
  @cast url: string;
  @cast channel: string;
  @cast username: string;
  @cast @element(String) keywords: string[];
}
