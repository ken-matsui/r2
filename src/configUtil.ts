import * as fs from "fs";
import * as _ from "lodash";
import * as path from "path";
import { Broker, BrokerConfig, RootConfig } from "./types";
import { readJsonFileSync } from "./util";

const defaultValues = {
  symbol: "BTC/JPY",
};

export function getConfigRoot(): RootConfig {
  let configPath = getConfigPath();
  if (!fs.existsSync(configPath)) {
    configPath = path.join(process.cwd(), path.basename(configPath));
  }
  const config = new RootConfig(readJsonFileSync(configPath));
  return _.defaultsDeep({}, config, defaultValues);
}

export function getConfigPath(): string {
  return process.env.NODE_ENV !== "test" ? `${process.cwd()}/config.json` : `${__dirname}/__tests__/config_test.json`;
}

export function findBrokerConfig(configRoot: RootConfig, broker: Broker): BrokerConfig {
  const found = configRoot.brokers.find((brokerConfig) => brokerConfig.broker === broker);
  if (found === undefined) {
    throw new Error(`Unable to find ${broker} in config.`);
  }
  return found;
}
