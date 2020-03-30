import fetch, { RequestInit as FetchRequestInit } from "node-fetch";
import { SlackConfig } from "../types";

export default class SlackIntegration {
  private static fetchTimeout = 5000;

  constructor(private readonly config: SlackConfig) {
    this.config = config;
  }

  public handler(message: string): void {
    const keywords = this.config.keywords;
    if (!(keywords instanceof Array)) {
      return;
    }
    if (!keywords.some((x) => message.includes(x))) {
      return;
    }
    const payload = {
      channel: this.config.channel,
      text: message,
      username: this.config.username,
    };
    const init: FetchRequestInit = {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      timeout: SlackIntegration.fetchTimeout,
    };
    fetch(this.config.url, init).catch((ex) => console.log(ex));
  }
}
