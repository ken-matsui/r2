import {cast, Castable, element} from "@bitr/castable";

export class LineConfig extends Castable {
    @cast public enabled: boolean;
    @cast public token: string;
    @cast
    @element(String)
    public keywords: string[];
}
