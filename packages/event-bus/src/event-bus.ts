export type EventBusListenerId = number;
export type EventBusListener<T = unknown> = (event: T) => void;
export type EventBusListenerOptions = {
  /**
   * Remove the listener after the first time it is called.
   */
  once?: boolean;

  /**
   * Log the event to the console.
   */
  log?: boolean;
};

type EventBusListenerWithOptions<T> = {
  id: EventBusListenerId;
  listener: EventBusListener<T>;
  options?: EventBusListenerOptions;
};

/**
 * Interface to be implemented by classes that can emit events to the public.
 */
export interface EventBusable<Events extends Record<string, unknown>> {
  /**
   * Register a listener for an event.
   *
   * @param event - Event name.
   * @param listener - Listener callback.
   *
   * @returns The ID of the listener.
   */
  on<K extends keyof Events>(
    event: K,
    listener: EventBusListener<Events[K]>,
    options?: EventBusListenerOptions,
  ): EventBusListenerId;

  /**
   * Remove a listener for an event.
   *
   * @param event - Event name.
   * @param listener - Listener callback.
   */
  off<K extends keyof Events>(
    event: K,
    listener: EventBusListener<Events[K]> | EventBusListenerId,
  ): void;
}

/**
 * Event bus for emitting and listening to events.
 */
export class EventBus<Events extends Record<string, unknown>>
  implements EventBusable<Events> {
  private static busIdCounter = 0;
  private static listenerIdCounter: EventBusListenerId = -1;

  private _name = `event-bus-${++EventBus.busIdCounter}`;
  get name(): string {
    return this._name;
  }

  private events: Map<keyof Events, Set<EventBusListenerWithOptions<unknown>>> =
    new Map();

  constructor(name: string | null = null) {
    if (name !== null) {
      this._name = name;
    }
  }

  /**
   * Register a listener for an event.
   *
   * @param event - Event name.
   * @param listener - Listener function.
   */
  on<K extends keyof Events>(
    event: K,
    listener: EventBusListener<Events[K]>,
    options?: EventBusListenerOptions,
  ): EventBusListenerId {
    const listeners = this.getListenersWithOptions(event) ?? new Set();
    const id = ++EventBus.listenerIdCounter;
    listeners.add({
      id,
      listener: listener as EventBusListener<unknown>,
      options,
    });

    this.events.set(event, listeners);

    return id;
  }

  /**
   * Emit an event.
   *
   * @param event - Event name.
   * @param data - Data to pass to listeners.
   */
  emit<K extends keyof Events>(event: K, data?: Events[K]): void {
    const listenersWithOptions = this.getListenersWithOptions(event);
    if (listenersWithOptions) {
      for (const x of listenersWithOptions) {
        x.listener(data);
        if (x.options?.once) {
          listenersWithOptions.delete(x);
        }
        if (x.options?.log) {
          this.logEvent(event, data);
        }
      }
    }
  }

  private logEvent<K extends keyof Events>(event: K, data?: Events[K]) {
    console.table({
      bus: this._name,
      event: event.toString(),
      data,
    });
  }

  /**
   * Remove a listener for an event.
   *
   * @param event - Event name.
   * @param listener - Listener function.
   */
  off<K extends keyof Events>(
    event: K,
    listener: EventBusListener<Events[K]> | EventBusListenerId,
  ) {
    if (typeof listener === 'number') {
      this.removeListenerById(event, listener);
    } else {
      this.removeListenerByCallback(event, listener);
    }
  }

  private removeListenerByCallback<K extends keyof Events>(
    event: K,
    listener: EventBusListener<Events[K]>,
  ) {
    const listenersWithOptions = this.getListenersWithOptions(event);
    if (listenersWithOptions) {
      for (const x of listenersWithOptions) {
        if (x.listener === listener) {
          listenersWithOptions.delete(x);
        }
      }
    }
  }

  private removeListenerById<K extends keyof Events>(
    event: K,
    id: EventBusListenerId,
  ) {
    const listenersWithOptions = this.getListenersWithOptions(event);
    if (listenersWithOptions) {
      for (const x of listenersWithOptions) {
        if (x.id === id) {
          listenersWithOptions.delete(x);
        }
      }
    }
  }

  /**
   * Remove all listeners for all events.
   */
  clear() {
    for (const listeners of this.events.values()) {
      listeners.clear();
    }
    this.events.clear();
  }

  private getListenersWithOptions<K extends keyof Events>(event: K) {
    return this.events.get(event) ?? null;
  }
}
