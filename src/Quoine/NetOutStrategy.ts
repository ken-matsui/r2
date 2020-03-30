import * as _ from "lodash";
import BrokerApi from "./BrokerApi";
import { ICashMarginTypeStrategy } from "./types";

export default class NetOutStrategy implements ICashMarginTypeStrategy {
  constructor(private readonly brokerApi: BrokerApi) {}

  public async getBtcPosition(): Promise<number> {
    const accounts = await this.brokerApi.getTradingAccounts();
    const account = _.find(accounts, (b) => b.currency_pair_code === "BTCJPY");
    if (!account) {
      throw new Error("Unable to find the account.");
    }
    return account.position;
  }
}
