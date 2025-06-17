import { subscribe, getEventHistory, publish } from './nats-bus.js';

class NatsDebugger {
  constructor() {
    this.isEnabled = true;
    this.logContainer = null;
    this.init();
  }

  init() {
    // Subscribe to all events
    subscribe('*', (message) => {
      if (this.isEnabled) {
        this.logEvent(message);
      }
    });

    // Create debug UI
    this.createDebugUI();
  }

  createDebugUI() {
    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
      .nats-debugger {
        position: fixed;
        top: 10px;
        right: 10px;
        width: 400px;
        height: 300px;
        background: rgba(0, 0, 0, 0.9);
        color: #00ff00;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        border-radius: 8px;
        z-index: 10000;
        display: none;
        flex-direction: column;
      }
      .nats-debugger.active {
        display: flex;
      }
      .nats-debugger-header {
        background: #333;
        padding: 8px;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .nats-debugger-content {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }
      .nats-event {
        margin-bottom: 4px;
        padding: 4px;
        border-left: 3px solid #00ff00;
        background: rgba(0, 255, 0, 0.1);
      }
      .nats-event.warning {
        border-left-color: #ffaa00;
        background: rgba(255, 170, 0, 0.1);
      }
      .nats-event.error {
        border-left-color: #ff0000;
        background: rgba(255, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);

    // Create debugger UI
    const debugger = document.createElement('div');
    debugger.className = 'nats-debugger';
    debugger.innerHTML = `
      <div class="nats-debugger-header">
        <span>🚌 NATS Debugger</span>
        <div>
          <button onclick="window.natsDebugger.clear()">Clear</button>
          <button onclick="window.natsDebugger.toggle()">Hide</button>
        </div>
      </div>
      <div class="nats-debugger-content" id="nats-log-content"></div>
    `;
    
    document.body.appendChild(debugger);
    this.logContainer = document.getElementById('nats-log-content');

    // Add keyboard shortcut (Ctrl+Shift+N)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        this.toggle();
      }
    });

    // Expose to window for easy access
    window.natsDebugger = this;
  }

  logEvent(message) {
    if (!this.logContainer) return;

    const eventDiv = document.createElement('div');
    eventDiv.className = 'nats-event';
    
    const time = new Date(message.timestamp).toLocaleTimeString();
    const subject = message.subject;
    const source = message.source || 'unknown';
    
    eventDiv.innerHTML = `
      <div><strong>[${time}]</strong> ${subject}</div>
      <div>From: ${source}</div>
      <div>Data: ${JSON.stringify(message.data, null, 2)}</div>
    `;

    this.logContainer.insertBefore(eventDiv, this.logContainer.firstChild);

    // Keep only last 50 events
    while (this.logContainer.children.length > 50) {
      this.logContainer.removeChild(this.logContainer.lastChild);
    }
  }

  toggle() {
    const debugger = document.querySelector('.nats-debugger');
    debugger.classList.toggle('active');
  }

  clear() {
    if (this.logContainer) {
      this.logContainer.innerHTML = '';
    }
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }
}

// Initialize debugger
const debugger = new NatsDebugger();

export default debugger;
