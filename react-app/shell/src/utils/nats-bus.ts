import { useState, useEffect, useCallback, useRef } from "react";
import "regenerator-runtime/runtime";
import {
  connect,
  StringCodec,
  consumerOpts,
  NatsConnection,
  JetStreamClient,
  ConsumerOptsBuilder,
  PubAck,
  Subscription, // Keep if used elsewhere, not directly in this snippet for pull
  ConnectionOptions,
  JetStreamPullSubscription, // Corrected type
  ConsumerOpts, // Import ConsumerOpts for the plain object
  // ConsumerMessages, // Keep if used elsewhere
} from "nats.ws";

const NATS_SERVER: string = "ws://10.63.22.76:8080"; // Consider moving to env variables
const SUBJECT: string = "app.navigation";
const CONSUMER_NAME: string = "myNatsHookConsumer"; // Ensure unique consumer names if multiple hooks subscribe differently

const sc = StringCodec();

export interface NavigationMessage {
  action: string;
  page: string;
  durationMs?: number; // Add optional duration
}

interface UseNatsReturn {
  publishMessage: (action: string, page: string, durationMs?: number) => Promise<PubAck | undefined>; // Signature updated here
  subscribeToMessages: (
    callback: (message: NavigationMessage) => void
  ) => Promise<(() => void) | undefined>; // Returns an unsubscribe function
  isConnected: boolean;
  error: Error | null;
}

// Keep nc and js outside the hook to act as singletons for the application
let nc: NatsConnection | null = null;
let js: JetStreamClient | null = null;
let connectionPromise: Promise<void> | null = null;
let activeSubscriptions = 0;

async function ensureNatsConnection(): Promise<{ nc: NatsConnection; js: JetStreamClient }> {
  if (nc && js && nc.isClosed() === false) {
    return { nc, js };
  }

  if (connectionPromise) {
    await connectionPromise;
    if (nc && js) return { nc, js }; // Connection might have succeeded
    // If it's still null, the previous attempt failed, so we try again.
  }

  console.log("🔗 [NATS Hook] Attempting to connect...");
  connectionPromise = (async () => {
    try {
      const newNc = await connect({
        servers: [NATS_SERVER],
        ignoreClusterUpdates: true,
        reconnect: true,
        maxReconnectAttempts: -1, // Infinite reconnects
        reconnectTimeWait: 5000, // Wait 5s between reconnects
      } as ConnectionOptions); // Cast to ConnectionOptions if type inference issues

      newNc.closed().then((err) => {
        console.warn(`🔌 [NATS Hook] Connection closed. ${err ? 'Error: ' + err.message : 'Closed by client.'}`);
        nc = null;
        js = null;
        connectionPromise = null; // Allow new connection attempts
      });

      (async () => {
        for await (const status of newNc.status()) {
          console.info(`ℹ️ [NATS Hook] Status: ${status.type}`, status.data);
        }
      })().catch(err => console.error("Error in NATS status listener:", err));


      nc = newNc;
      js = newNc.jetstream();
      console.log("🔗 [NATS Hook] Connected & JetStream initialized.");
    } catch (err) {
      console.error("❌ [NATS Hook] Connection error:", err);
      nc = null;
      js = null;
      connectionPromise = null; // Clear promise on failure to allow retry
      throw err; // Re-throw to be caught by the caller
    }
  })();

  await connectionPromise;
  if (!nc || !js) {
    throw new Error("NATS connection failed after attempt.");
  }
  return { nc, js };
}


export function useNats(): UseNatsReturn {
  const [isConnected, setIsConnected] = useState<boolean>(!!(nc && !nc.isClosed()));
  const [error, setError] = useState<Error | null>(null);
  const currentSubscriptionRef = useRef<JetStreamPullSubscription | null>(null); // Use JetStreamPullSubscription
  const callbackRef = useRef<((message: NavigationMessage) => void) | null>(null);

  useEffect(() => {
    activeSubscriptions++;
    ensureNatsConnection()
      .then(() => {
        setIsConnected(true);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ [NATS Hook] Failed to connect in useEffect:", err);
        setError(err as Error);
        setIsConnected(false);
      });

    let statusInterval: NodeJS.Timeout | undefined;
    if (nc) {
        statusInterval = setInterval(() => {
            setIsConnected(!!(nc && !nc.isClosed()));
        }, 2000);
    }

    return () => {
      activeSubscriptions--;
      if (statusInterval) clearInterval(statusInterval);

      if (currentSubscriptionRef.current) {
        console.log("🎣 [NATS Hook] Cleaning up subscription for this hook instance.");
        currentSubscriptionRef.current.destroy().catch(err => console.error("Error destroying subscription:", err));
        currentSubscriptionRef.current = null;
      }

      if (activeSubscriptions === 0 && nc && !nc.isClosed()) {
        console.log("🔌 [NATS Hook] All hooks unmounted, closing NATS connection.");
        nc.close().catch(err => console.error("Error closing NATS connection:", err));
        nc = null;
        js = null;
        connectionPromise = null;
        setIsConnected(false);
      }
    };
  }, []);

 
  const publishMessage = useCallback(
    async (action: string, page: string, durationMs?: number): Promise<PubAck | undefined> => { // Implementation updated here
      try {
        const { js: currentJs } = await ensureNatsConnection();
        if (!currentJs) {
          console.error("❌ [NATS Hook] JetStream not initialized. Cannot publish.");
          // setError(new Error("JetStream not initialized")); // setError is defined in the hook
          return undefined;
        }
        const message: NavigationMessage = { action, page };
        if (durationMs !== undefined) {
          message.durationMs = Math.round(durationMs);
        }

        const ack = await currentJs.publish(SUBJECT, sc.encode(JSON.stringify(message))); // sc and SUBJECT should be defined in this file
        let logMessage = `📢 [NATS Hook] Published: ${action} - ${page}`;
        if (message.durationMs !== undefined) {
          logMessage += `, duration: ${message.durationMs}ms`;
        }
        logMessage += ` (Seq: ${ack.seq})`;
        console.log(logMessage);

        return ack;
      } catch (err) {
        console.error("❌ [NATS Hook] Publish error:", err);
        // setError(err as Error); // setError is defined in the hook
        return undefined;
      }
    },
    [] // ensureNatsConnection and other dependencies if they change
  );

  const subscribeToMessages = useCallback(
    async (
      callback: (message: NavigationMessage) => void
    ): Promise<(() => void) | undefined> => {
      callbackRef.current = callback;
      try {
        const { js: currentJs, nc: currentNc } = await ensureNatsConnection();
        if (!currentJs || !currentNc) {
          console.error("❌ [NATS Hook] JetStream not initialized. Cannot subscribe.");
          setError(new Error("JetStream not initialized"));
          return undefined;
        }

        if (currentSubscriptionRef.current) {
            console.log("🎣 [NATS Hook] Destroying previous subscription before creating a new one.");
            await currentSubscriptionRef.current.destroy().catch(err => console.error("Error destroying previous subscription:", err));
            currentSubscriptionRef.current = null;
        }

        console.log(`👂 [NATS Hook] Subscribing to ${SUBJECT} using pull...`);
        const optsBuilder: ConsumerOptsBuilder = consumerOpts();
        optsBuilder.durable(CONSUMER_NAME + "_" + Date.now());
        optsBuilder.manualAck();
        optsBuilder.ackExplicit();
        optsBuilder.maxMessages(10);
        // optsBuilder.filterSubject(SUBJECT); // Not needed if subscribing directly to the subject

        // Pass the builder object directly to pullSubscribe
        const sub: JetStreamPullSubscription = await currentJs.pullSubscribe(SUBJECT, optsBuilder);
        currentSubscriptionRef.current = sub;

        (async () => {
          // Access consumer name via consumerInfo property
          console.log(`[NATS Hook] Pull consumer ${sub.consumerInfo?.name || 'unknown'} for ${SUBJECT} is active.`);
          for await (const m of sub) {
            try {
              const decodedMessage: NavigationMessage = JSON.parse(sc.decode(m.data));
              console.log(`📥 [NATS Hook] Received:`, decodedMessage);
              if (callbackRef.current) {
                callbackRef.current(decodedMessage);
              }
              m.ack();
            } catch (parseError) {
              console.error("❌ [NATS Hook] Error parsing message or in callback:", parseError);
            }
          }
          console.log(`[NATS Hook] Subscription closed for ${SUBJECT}`);
        })().catch((err) => {
          if (!currentNc.isClosed()) {
            console.error(`❌ [NATS Hook] Subscription error for ${SUBJECT}:`, err);
            setError(err as Error);
          }
          currentSubscriptionRef.current = null;
        });

        const pullInterval = setInterval(() => {
            if (sub && !sub.isClosed() && currentNc && !currentNc.isClosed()) {
                 sub.pull({ batch: 10, expires: 2000 });
            } else {
                clearInterval(pullInterval);
            }
        }, 3000);

        const unsubscribe = () => {
          console.log(`🎣 [NATS Hook] Unsubscribing from ${SUBJECT}`);
          clearInterval(pullInterval);
          if (sub && !sub.isClosed()) {
            sub.destroy().catch(err => console.error("Error destroying subscription on unsubscribe:", err));
          }
          currentSubscriptionRef.current = null;
        };
        return unsubscribe;

      } catch (err) {
        console.error("❌ [NATS Hook] Subscribe error:", err);
        setError(err as Error);
        return undefined;
      }
    },
    []
  );

  return { publishMessage, subscribeToMessages, isConnected, error };
}