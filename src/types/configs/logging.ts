import {cast, Castable} from "@bitr/castable";
import {LineConfig} from "./line";
import {SlackConfig} from "./slack";

export class LoggingConfig extends Castable {
    @cast public slack: SlackConfig;
    @cast public line: LineConfig;
}
