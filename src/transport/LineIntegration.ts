import fetch, { RequestInit as FetchRequestInit } from "node-fetch";
import * as querystring from "querystring";
import { LineConfig } from "../types";

export default class LineIntegration {
  private static fetchTimeout = 5000;
  private static apiUrl = "https://notify-api.line.me/api/notify";

  constructor(private readonly config: LineConfig) {
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
    const payload = { message };
    const body = querystring.stringify(payload);
    const init: FetchRequestInit = {
      body,
      headers: {
        "Authorization": `Bearer ${this.config.token}`,
        "Content-Length": body.length.toString(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      timeout: LineIntegration.fetchTimeout,
    };
    fetch(LineIntegration.apiUrl, init)
      .then((res) => {
        if (!res.ok) {
          res.text().then((s) => console.log(`LINE notify failed. ${res.statusText}: ${s}`));
        }
      })
      .catch((ex) => console.log(`LINE notify failed. ${ex}`));
  }
}
