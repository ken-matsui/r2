import { Socket } from "zeromq";

// patch for @types/zeromq FIXME: Unused interface
export interface IZmqSocket extends Socket {
  removeAllListeners: any;
  once: any;
}
