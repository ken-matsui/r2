import {cast, Castable} from "@bitr/castable";
import {SlackConfig} from "./slack";
import {LineConfig} from "./line";

export class LoggingConfig extends Castable {
  @cast slack: SlackConfig;
  @cast line: LineConfig;
}
