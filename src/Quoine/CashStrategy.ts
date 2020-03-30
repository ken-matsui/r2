import BrokerApi from "./BrokerApi";
import { ICashMarginTypeStrategy } from "./types";

export default class CashStrategy implements ICashMarginTypeStrategy {
  constructor(private readonly brokerApi: BrokerApi) {}

  public async getBtcPosition(): Promise<number> {
    const accounts = await this.brokerApi.getAccountBalance();
    const account = accounts.find((b) => b.currency === "BTC");
    if (account === undefined) {
      throw new Error ("Unable to find the account.");
    }
    return account.balance;
  }
}
