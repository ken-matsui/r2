import { getLogger } from "@bitr/logger";
import ZmqSubscriber from "@bitr/zmq/dist/ZmqSubscriber";
import { configStoreSocketUrl, reportServicePubUrl, reportServiceRepUrl } from "../constants";
import { ConfigRequester, SnapshotRequester } from "../messages";
import { AnalyticsConfig,  ISpreadStat } from "../types";

export interface ISpreadStatHandlerPlugin {
  handle: (spreadStat: ISpreadStat) => any;
}

export default class AnalyticsService {
  private config: AnalyticsConfig;
  private isHandling: boolean;
  private readonly log = getLogger(this.constructor.name);
  private readonly pluginDir = `${process.cwd()}/plugins`;
  private readonly streamSubscriber: ZmqSubscriber;
  private readonly snapshotRequester: SnapshotRequester;
  private readonly configRequester: ConfigRequester;
  private spreadStatHandler: ISpreadStatHandlerPlugin;

  constructor() {
    this.configRequester = new ConfigRequester(configStoreSocketUrl);
    this.snapshotRequester = new SnapshotRequester(reportServiceRepUrl);
    this.streamSubscriber = new ZmqSubscriber(reportServicePubUrl);
  }

  public async start(): Promise<void> {
    this.log.debug("Starting AnalyticsService");
    this.config = await this.getConfig();
    const snapshotMessage = await this.snapshotRequester.request({ type: "spreadStatSnapshot" });
    if (!snapshotMessage.success || snapshotMessage.data === undefined) {
      throw new Error("Failed to initial snapshot message.");
    }
    this.spreadStatHandler = await this.getSpreadStatHandler(snapshotMessage.data);
    this.streamSubscriber.subscribe<ISpreadStat>("spreadStat", (message) => this.handleStream(message));
    process.on("message", (message) => {
      if (message === "stop") {
        this.log.info("Analysis process received stop message.");
        this.stop();
      }
    });
    this.log.debug("Started.");
  }

  public async stop(): Promise<void> {
    this.log.debug("Stopping AnalyticsService...");
    try {
      this.streamSubscriber.unsubscribe("spreadStat");
      this.streamSubscriber.dispose();
      this.snapshotRequester.dispose();
      this.configRequester.dispose();
    } catch (ex) {
      this.log.warn(ex.message);
      this.log.debug(ex.stack);
    }
    this.log.debug("Stopped.");
  }

  private async getConfig(): Promise<AnalyticsConfig> {
    const reply = await this.configRequester.request({ type: "get" });
    if (!reply.success || reply.data === undefined) {
      throw new Error("Analytics failed to get the config.");
    }
    return reply.data.analytics;
  }

  private async getSpreadStatHandler(snapshot: ISpreadStat[]): Promise<ISpreadStatHandlerPlugin> {
    const SpreadStatHandler = await import(`${this.pluginDir}/${this.config.plugin}`);
    return new SpreadStatHandler(snapshot);
  }

  private async handleStream(spreadStat: ISpreadStat | undefined): Promise<void> {
    if (this.isHandling) {
      return;
    }
    try {
      this.isHandling = true;
      this.log.debug("Received spread-stat message.");
      if (spreadStat) {
        const config = await this.spreadStatHandler.handle(spreadStat);
        if (config) {
          this.log.debug(`Sending to config store... ${JSON.stringify(config)}`);
          const reply = await this.configRequester.request({ type: "set", data: config });
          this.log.debug(`Reply from config store: ${JSON.stringify(reply)}`);
        }
      }
    } catch (ex) {
      this.log.warn(`${ex.message}`);
      this.log.debug(ex.stack);
    } finally {
      this.isHandling = false;
    }
  }
}
