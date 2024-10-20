/**
 * A simple event bus that is primarily useful when working outside of the DOM.
 * @module
 *
 * @example
 * ```ts
 *  // Declare a type for the events.
 *  // Key-value pairs of event names and their payloads.
 *  type MyEvents = {
 *    event1: { foo: string };
 *    event2: { bar: number };
 *  };
 *
 *  // Create
 *  const eventBus = new KTGEventBus<MyEvents>();
 *
 *  // First listener, saving the listener ID for later removal
 *  const listenerId = eventBus.on('event1', (event) => {
 *    console.log(event.foo);
 *  });
 *
 *  // Second listener, with a reference to the callback function
 *  const secondListener = (event: { bar: number }) => {
 *    console.log(event.bar);
 *  };
 *  eventBus.on('event2', secondListener);
 *
 *  // Emit events
 *  eventBus.emit('event1', { foo: 'Hello, World!' }); // Logs: Hello, World!
 *  eventBus.emit('event2', { bar: 42 }); // Logs: 42
 *
 *  // Remove a specific listener by ID
 *  eventBus.off('event1', listenerId);
 *
 *  // Remove a specific listener by reference
 *  eventBus.off('event2', secondListener);
 *
 *  // Can also call `clear` to remove all listeners from all events
 *  eventBus.clear();
 * ```
 */
export * from './event-bus.ts';
