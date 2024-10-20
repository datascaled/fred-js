import {
  EventBus,
  type EventBusable,
  type EventBusListener,
  type EventBusListenerId,
  type EventBusListenerOptions,
} from '@crux/event-bus';

/**
 * A function that will be called to uniquely identify items.
 * @template T - The type of items being selected.
 * @param {T} item - The item to identify.
 * @returns {unknown} - A unique identifier for the item.
 * @example (item: { id: number, name: string }) => item.id
 */
export type SelectionModelIdentifyByFn<T> = (item: T) => unknown;

/**
 * A change to the selection state of items.
 * @template T - The type of items being selected.
 */
export type SelectionModelChange<T> = {
  added: T[];
  removed: T[];
};

type SelectionModelEvents<T> = {
  change: SelectionModelChange<T>;
};

/**
 * Tracks the selection state of items.
 *
 * @template T - The type of items being selected.
 */
export class SelectionModel<T>
  implements EventBusable<SelectionModelEvents<T>> {
  private static idCounter = -1;
  private _identifyBy: SelectionModelIdentifyByFn<T> = (item: T) => item;

  private eventBus = new EventBus<SelectionModelEvents<T>>(
    `selection-model-${++SelectionModel.idCounter}`,
  );
  private selectedItems = new Map<unknown, T>();

  /**
   * @param {SelectionModelIdentifyByFn} fn - A function that will be called to uniquely identify items.
   */
  identifyBy(fn: SelectionModelIdentifyByFn<T>): SelectionModel<T> {
    this._identifyBy = fn;
    return this;
  }

  /**
   * Toggle the selection of an item.
   */
  toggle(item: T): void {
    const id = this._identifyBy(item);
    if (this.selectedItems.has(id)) {
      this.deselect(item);
    } else {
      this.select(item);
    }
  }

  /**
   * Adds an item to the selection.
   */
  select(item: T): void {
    const removed: T[] = [];
    const id = this._identifyBy(item);
    this.selectedItems.set(id, item);
    this.eventBus.emit('change', { added: [item], removed });
  }

  /**
   * Removes an item from the selection.
   */
  deselect(item: T): void {
    const id = this._identifyBy(item);
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id);
      this.eventBus.emit('change', { added: [], removed: [item] });
    }
  }

  /**
   * Clears all selected items.
   */
  clear(): void {
    const removed = Array.from(this.selectedItems.values());
    this.selectedItems.clear();
    this.eventBus.emit('change', { added: [], removed });
  }

  /**
   * Add all of the given items to the selection.
   *
   * @param {T[]} items - The items to select.
   */
  selectMultiple(items: T[]): void {
    const added: T[] = [];
    for (const item of items) {
      const id = this._identifyBy(item);
      if (!this.selectedItems.has(id)) {
        this.selectedItems.set(id, item);
        added.push(item);
      }
    }
    this.eventBus.emit('change', { added, removed: [] });
  }

  /**
   * Remove all of the given items from the selection.
   *
   * @param {T[]} items - The items to deselect.
   */
  deselectMultiple(items: T[]): void {
    const removed: T[] = [];
    for (const item of items) {
      const id = this._identifyBy(item);
      if (this.selectedItems.has(id)) {
        this.selectedItems.delete(id);
        removed.push(item);
      }
    }
    this.eventBus.emit('change', { added: [], removed });
  }

  /**
   * Check if an item is selected.
   *
   * @param {T} item - The item to check.
   */
  isSelected(item: T): boolean {
    return this.selectedItems.has(this._identifyBy(item));
  }

  /**
   * Get the selected items.
   */
  getSelectedItems(): T[] {
    return Array.from(this.selectedItems.values());
  }

  /**
   * Remove all listeners and clear the selection.
   */
  destroy(): void {
    this.eventBus.clear();
    this.selectedItems.clear();
  }

  /**
   * Add an event listener.
   */
  on<K extends keyof SelectionModelEvents<T>>(
    event: K,
    listener: EventBusListener<SelectionModelEvents<T>[K]>,
    options?: EventBusListenerOptions | undefined,
  ): EventBusListenerId {
    return this.eventBus.on(event, listener, options);
  }

  /**
   * Remove an event listener.
   */
  off<K extends keyof SelectionModelEvents<T>>(
    event: K,
    listener:
      | EventBusListener<SelectionModelEvents<T>[K]>
      | EventBusListenerId,
  ): void {
    this.eventBus.off(event, listener);
  }

  /**
   * Check if at least one item is selected.
   */
  get hasSelection(): boolean {
    return this.selectedItems.size > 0;
  }

  /**
   * Check if has exactly one item selected.
   */
  get hasSingleSelection(): boolean {
    return this.selectedItems.size === 1;
  }

  /**
   * Check if has more than one item selected.
   */
  get hasMultipleSelection(): boolean {
    return this.selectedItems.size > 1;
  }

  /**
   * Get the number of selected items.
   */
  get selectionCount(): number {
    return this.selectedItems.size;
  }
}
