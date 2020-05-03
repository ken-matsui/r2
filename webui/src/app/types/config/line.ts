import {cast, Castable, element} from "@bitr/castable";

export class LineConfig extends Castable {
  @cast enabled: boolean;
  @cast token: string;
  @cast @element(String) keywords: string[];
}
