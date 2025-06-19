// import { useEffect, useRef } from "react";
// import { subscribe, NatsCallback } from "./nats-bus";

// /**
//  * useNats - React hook untuk subscribe ke subject NATS
//  * @param subject - string subject/topic
//  * @param callback - function(message) dipanggil saat event diterima
//  */
// export function useNats(subject: string, callback: NatsCallback) {
//   const callbackRef = useRef(callback);
//   callbackRef.current = callback;

//   useEffect(() => {
//     const unsub = subscribe(subject, (msg) => callbackRef.current(msg));
//     return () => unsub();
//   }, [subject]);
// }
