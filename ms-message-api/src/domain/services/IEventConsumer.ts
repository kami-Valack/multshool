export interface IEventConsumer {
  start(): Promise<void>;
  stop(): Promise<void>;
  onMessage(callback: (message: any) => Promise<void>): void;
}

