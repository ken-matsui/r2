import { ZmqRequester, ZmqResponder } from "@bitr/zmq";
import { ConfigRoot, ISpreadStat } from "./types";

export interface IGenericRequest<T> {
  type: string;
  data?: T;
}

export interface IGenericResponse<T> {
  success: boolean;
  reason?: string;
  data?: T;
}

export interface IConfigRequest extends IGenericRequest<any> {}
export interface IConfigResponse extends IGenericResponse<ConfigRoot> {}
export class ConfigRequester extends ZmqRequester<IConfigRequest, IConfigResponse> {}
export class ConfigResponder extends ZmqResponder<IConfigRequest, IConfigResponse> {}

export interface ISnapshotRequest extends IGenericRequest<never> {}
export interface ISnapshotResponse extends IGenericResponse<ISpreadStat[]> {}
export class SnapshotRequester extends ZmqRequester<ISnapshotRequest, ISnapshotResponse> {}
export class SnapshotResponder extends ZmqResponder<ISnapshotRequest, ISnapshotResponse> {}
