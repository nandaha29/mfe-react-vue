// NATS Bus untuk komunikasi antar microfrontend
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

class NatsBus {
  private subscribers: Map<string, Set<NatsCallback>>;
  private eventHistory: NatsMessage[];
  private maxHistorySize: number;
  public isConnected: boolean;

  constructor() {
    this.subscribers = new Map();
    this.eventHistory = [];
    this.maxHistorySize = 100;
    this.isConnected = true;
    
    console.log('🚌 NATS Bus initialized');
  }

  // Publish message ke topic tertentu
  publish(subject: string, data: any, options: NatsPublishOptions = {}): string {
    const message: NatsMessage = {
      subject,
      data,
      timestamp: new Date().toISOString(),
      id: this.generateId(),
      source: options.source || 'unknown',
      ...options
    };

    // Add to history
    this.eventHistory.unshift(message);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.pop();
    }

    console.log(`📤 [NATS] Publishing to "${subject}":`, message);

    // Notify all subscribers for this subject
    if (this.subscribers.has(subject)) {
      this.subscribers.get(subject)!.forEach(callback => {
        try {
          callback(message);
        } catch (error) {
          console.error(`❌ [NATS] Error in subscriber for "${subject}":`, error);
        }
      });
    }

    // Notify wildcard subscribers
    this.notifyWildcardSubscribers(subject, message);

    return message.id;
  }

  // Subscribe ke topic tertentu
  subscribe(subject: string, callback: NatsCallback): UnsubscribeFunction {
    if (!this.subscribers.has(subject)) {
      this.subscribers.set(subject, new Set());
    }

    this.subscribers.get(subject)!.add(callback);

    console.log(`📥 [NATS] Subscribed to "${subject}"`);

    // Return unsubscribe function
    return () => this.unsubscribe(subject, callback);
  }

  // Unsubscribe dari topic
  unsubscribe(subject: string, callback: NatsCallback): void {
    if (this.subscribers.has(subject)) {
      this.subscribers.get(subject)!.delete(callback);
      
      if (this.subscribers.get(subject)!.size === 0) {
        this.subscribers.delete(subject);
      }
    }

    console.log(`📤 [NATS] Unsubscribed from "${subject}"`);
  }

  // Request-Reply pattern
  async request(subject: string, data: any, timeout: number = 5000): Promise<NatsMessage> {
    return new Promise((resolve, reject) => {
      const replySubject = `_REPLY.${this.generateId()}`;
      const timeoutId = setTimeout(() => {
        this.unsubscribe(replySubject, replyHandler);
        reject(new Error(`Request timeout for subject: ${subject}`));
      }, timeout);

      const replyHandler = (message: NatsMessage) => {
        clearTimeout(timeoutId);
        this.unsubscribe(replySubject, replyHandler);
        resolve(message);
      };

      this.subscribe(replySubject, replyHandler);
      this.publish(subject, data, { replyTo: replySubject });
    });
  }

  // Notify wildcard subscribers (subject.*)
  private notifyWildcardSubscribers(subject: string, message: NatsMessage): void {
    const parts = subject.split('.');
    for (let i = 1; i <= parts.length; i++) {
      const wildcardSubject = parts.slice(0, i).join('.') + '.*';
      if (this.subscribers.has(wildcardSubject)) {
        this.subscribers.get(wildcardSubject)!.forEach(callback => {
          try {
            callback(message);
          } catch (error) {
            console.error(`❌ [NATS] Error in wildcard subscriber for "${wildcardSubject}":`, error);
          }
        });
      }
    }
  }

  // Generate unique ID
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Get connection status
  isConnectedToNats(): boolean {
    return this.isConnected;
  }

  // Get event history
  getEventHistory(limit: number = 50): NatsMessage[] {
    return this.eventHistory.slice(0, limit);
  }

  // Clear event history
  clearEventHistory(): void {
    this.eventHistory = [];
  }
}

// Create global instance
const natsBus = new NatsBus();

// Export functions untuk digunakan di microfrontend
export const publish = (subject: string, data: any, options?: NatsPublishOptions): string => 
  natsBus.publish(subject, data, options);

export const subscribe = (subject: string, callback: NatsCallback): UnsubscribeFunction => 
  natsBus.subscribe(subject, callback);

export const unsubscribe = (subject: string, callback: NatsCallback): void => 
  natsBus.unsubscribe(subject, callback);

export const request = (subject: string, data: any, timeout?: number): Promise<NatsMessage> => 
  natsBus.request(subject, data, timeout);

export const isConnected = (): boolean => natsBus.isConnectedToNats();

export const getEventHistory = (limit?: number): NatsMessage[] => natsBus.getEventHistory(limit);

// Export default instance
export default natsBus;
