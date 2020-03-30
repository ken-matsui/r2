import {cast, Castable} from "@bitr/castable";

export class AnalyticsConfig extends Castable {
    @cast public enabled: boolean;
    @cast public plugin: string;
    @cast public initialHistory: object;
}
