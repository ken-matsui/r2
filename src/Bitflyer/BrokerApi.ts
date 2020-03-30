import { hmac, nonce, safeQueryStringStringify } from "../util";
import WebClient from "../WebClient";
import {
  Balance,
  BalanceResponse,
  BoardResponse,
  ICancelChildOrderRequest,
  ICancelChildOrderResponse,
  ChildOrder,
  IChildOrdersParam,
  ChildOrdersResponse,
  Execution,
  IExecutionsParam,
  ExecutionsResponse,
  ISendChildOrderRequest,
  SendChildOrderResponse,
} from "./types";

export default class BrokerApi {
  private readonly baseUrl = "https://api.bitflyer.jp";
  private readonly webClient: WebClient = new WebClient(this.baseUrl);

  constructor(private readonly key: string, private readonly secret: string) {}

  public async sendChildOrder(request: ISendChildOrderRequest): Promise<SendChildOrderResponse> {
    const path = "/v1/me/sendchildorder";
    return new SendChildOrderResponse(await this.post<SendChildOrderResponse, ISendChildOrderRequest>(path, request));
  }

  public async cancelChildOrder(request: ICancelChildOrderRequest): Promise<ICancelChildOrderResponse> {
    const path = "/v1/me/cancelchildorder";
    return await this.post<ICancelChildOrderResponse, ICancelChildOrderRequest>(path, request);
  }

  public async getChildOrders(param: IChildOrdersParam): Promise<ChildOrdersResponse> {
    const path = "/v1/me/getchildorders";
    const response = await this.get<ChildOrdersResponse, IChildOrdersParam>(path, param);
    return response.map((x) => new ChildOrder(x));
  }

  public async getExecutions(param: IExecutionsParam): Promise<ExecutionsResponse> {
    const path = "/v1/me/getexecutions";
    const response = await this.get<ExecutionsResponse, IExecutionsParam>(path, param);
    return response.map((x) => new Execution(x));
  }

  public async getBalance(): Promise<BalanceResponse> {
    const path = "/v1/me/getbalance";
    const response = await this.get<BalanceResponse>(path);
    return response.map((x) => new Balance(x));
  }

  public async getBoard(): Promise<BoardResponse> {
    const path = "/v1/board";
    return new BoardResponse(await this.webClient.fetch<BoardResponse>(path, undefined, false));
  }

  private async call<R>(path: string, method: string, body: string = ""): Promise<R> {
    const n = nonce();
    const message = n + method + path + body;
    const sign = hmac(this.secret, message);
    const headers = {
      "Content-Type": "application/json",
      "ACCESS-KEY": this.key,
      "ACCESS-TIMESTAMP": n,
      "ACCESS-SIGN": sign,
    };
    const init = { method, headers, body };
    return await this.webClient.fetch<R>(path, init);
  }

  private async post<R, T>(path: string, requestBody: T): Promise<R> {
    const method = "POST";
    const body = JSON.stringify(requestBody);
    return await this.call<R>(path, method, body);
  }

  private async get<R, T = never>(path: string, requestParam?: T): Promise<R> {
    const method = "GET";
    let pathWithParam = path;
    if (requestParam) {
      const param = safeQueryStringStringify(requestParam);
      pathWithParam += `?${param}`;
    }
    return await this.call<R>(pathWithParam, method);
  }
}
