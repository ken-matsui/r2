import { IBrokerConfigType } from "../types";
import BrokerAdapterImpl from "./BrokerAdapterImpl";

export function create(config: IBrokerConfigType) {
  return new BrokerAdapterImpl(config);
}
