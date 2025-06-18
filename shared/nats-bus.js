// NATS Bus untuk komunikasi antar microfrontend
class NatsBus {
  constructor() {
    this.subscribers = new Map();
    this.eventHistory = [];
    this.maxHistorySize = 100;
    
    // Simulate NATS connection (dalam production gunakan NATS server)
    this.isConnected = true;
    
    console.log('🚌 NATS Bus initialized');
  }

  // Publish message ke topic tertentu
  publish(subject, data, options = {}) {
    const message = {
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
      this.subscribers.get(subject).forEach(callback => {
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
  subscribe(subject, callback, options = {}) {
    if (!this.subscribers.has(subject)) {
      this.subscribers.set(subject, new Set());
    }

    this.subscribers.get(subject).add(callback);

    console.log(`📥 [NATS] Subscribed to "${subject}"`);

    // Return unsubscribe function
    return () => this.unsubscribe(subject, callback);
  }

  // Unsubscribe dari topic
  unsubscribe(subject, callback) {
    if (this.subscribers.has(subject)) {
      this.subscribers.get(subject).delete(callback);
      
      if (this.subscribers.get(subject).size === 0) {
        this.subscribers.delete(subject);
      }
    }

    console.log(`📤 [NATS] Unsubscribed from "${subject}"`);
  }

  // Request-Reply pattern
  async request(subject, data, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const replySubject = `_REPLY.${this.generateId()}`;
      const timeoutId = setTimeout(() => {
        this.unsubscribe(replySubject, replyHandler);
        reject(new Error(`Request timeout for subject: ${subject}`));
      }, timeout);

      const replyHandler = (message) => {
        clearTimeout(timeoutId);
        this.unsubscribe(replySubject, replyHandler);
        resolve(message);
      };

      this.subscribe(replySubject, replyHandler);
      this.publish(subject, data, { replyTo: replySubject });
    });
  }

  // Notify wildcard subscribers (subject.*)
  notifyWildcardSubscribers(subject, message) {
    const parts = subject.split('.');
    for (let i = 1; i <= parts.length; i++) {
      const wildcardSubject = parts.slice(0, i).join('.') + '.*';
      if (this.subscribers.has(wildcardSubject)) {
        this.subscribers.get(wildcardSubject).forEach(callback => {
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
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Get connection status
  isConnectedToNats() {
    return this.isConnected;
  }

  // Get event history
  getEventHistory(limit = 50) {
    return this.eventHistory.slice(0, limit);
  }

  // Clear event history
  clearEventHistory() {
    this.eventHistory = [];
  }
}

// Create global instance
const natsBus = new NatsBus();

// Export functions untuk digunakan di microfrontend
export const publish = (subject, data, options) => natsBus.publish(subject, data, options);
export const subscribe = (subject, callback, options) => natsBus.subscribe(subject, callback, options);
export const unsubscribe = (subject, callback) => natsBus.unsubscribe(subject, callback);
export const request = (subject, data, timeout) => natsBus.request(subject, data, timeout);
export const isConnected = () => natsBus.isConnectedToNats();
export const getEventHistory = (limit) => natsBus.getEventHistory(limit);

// Export default instance
export default natsBus;

// Jangan import file ini di project TypeScript!
