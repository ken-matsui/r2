import {cast, Castable} from "@bitr/castable";

export class AnalyticsConfig extends Castable {
  @cast enabled: boolean;
  @cast plugin: string;
  @cast initialHistory: object;
}
