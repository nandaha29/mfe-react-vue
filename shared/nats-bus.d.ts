export interface NatsMessage {
  subject: string;
  data: any;
  timestamp: string;
  id: string;
  source: string;
  replyTo?: string;
}

export interface NatsPublishOptions {
  source?: string;
  replyTo?: string;
  [key: string]: any;
}

export interface NatsSubscribeOptions {
  [key: string]: any;
}

export type NatsCallback = (message: NatsMessage) => void;
export type UnsubscribeFunction = () => void;

export declare function publish(
  subject: string, 
  data: any, 
  options?: NatsPublishOptions
): string;

export declare function subscribe(
  subject: string, 
  callback: NatsCallback, 
  options?: NatsSubscribeOptions
): UnsubscribeFunction;

export declare function unsubscribe(
  subject: string, 
  callback: NatsCallback
): void;

export declare function request(
  subject: string, 
  data: any, 
  timeout?: number
): Promise<NatsMessage>;

export declare function isConnected(): boolean;

export declare function getEventHistory(limit?: number): NatsMessage[];

declare const natsBus: {
  publish: typeof publish;
  subscribe: typeof subscribe;
  unsubscribe: typeof unsubscribe;
  request: typeof request;
  isConnected: typeof isConnected;
  getEventHistory: typeof getEventHistory;
};

export default natsBus;
// Tidak perlu diubah, hanya pastikan file ini tetap ada.
