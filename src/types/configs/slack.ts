import {cast, Castable, element} from "@bitr/castable";

export class SlackConfig extends Castable {
    @cast public enabled: boolean;
    @cast public url: string;
    @cast public channel: string;
    @cast public username: string;
    @cast
    @element(String)
    public keywords: string[];
}
