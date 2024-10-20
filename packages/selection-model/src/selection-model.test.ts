import { expect } from '@std/expect';
import { describe, test } from '@std/testing/bdd';
import {
  SelectionModel,
  type SelectionModelChange,
} from './selection-model.ts';

describe('SelectionModel', () => {
  test('should initialize with no selected items', () => {
    const model = new SelectionModel();
    expect(model.getSelectedItems()).toStrictEqual([]);
  });

  test('should select an item', () => {
    const model = new SelectionModel();
    const item = { id: 1, name: 'item1' };
    model.select(item);
    expect(model.getSelectedItems()).toContain(item);
  });

  test('should deselect an item', () => {
    const model = new SelectionModel();
    const item = { id: 1, name: 'item1' };
    model.select(item);
    model.deselect(item);
    expect(model.getSelectedItems()).not.toContain(item);
  });

  test('should toggle selection of an item', () => {
    const model = new SelectionModel();
    const item = { id: 1, name: 'item1' };

    model.toggle(item);
    expect(model.getSelectedItems()).toContain(item);

    model.toggle(item);
    expect(model.getSelectedItems()).not.toContain(item);
  });

  test('should clear all selections', () => {
    const model = new SelectionModel();
    const item1 = { id: 1, name: 'item1' };
    const item2 = { id: 2, name: 'item2' };

    model.select(item1);
    model.select(item2);
    model.clear();

    expect(model.getSelectedItems()).toStrictEqual([]);
  });

  test('should select all items', () => {
    const model = new SelectionModel();
    const items = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
    ];

    model.selectMultiple(items);

    expect(model.getSelectedItems()).toStrictEqual(items);
  });

  test('should deselect all items', () => {
    const model = new SelectionModel();
    const items = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
    ];

    model.selectMultiple(items);
    model.deselectMultiple(items);

    expect(model.getSelectedItems()).toStrictEqual([]);
  });

  test('should identify items using custom identify function', () => {
    const item = { id: 1, name: 'item1' };
    const model = new SelectionModel<typeof item>().identifyBy((i) => i.id);

    model.select(item);

    expect(model.getSelectedItems()).toContain(item);
  });

  test('should check if an item is selected', () => {
    const item = { id: 1, name: 'item1' };
    const model = new SelectionModel<typeof item>();

    model.select(item);
    expect(model.isSelected(item)).toBe(true);

    model.deselect(item);
    expect(model.isSelected(item)).toBe(false);
  });

  test('should emit change event on select', () => {
    const item = { id: 1, name: 'item1' };
    const model = new SelectionModel<typeof item>();
    const changes: SelectionModelChange<typeof item>[] = [];

    model.on('change', (change: SelectionModelChange<typeof item>) => {
      changes.push(change);
    });

    model.select(item);

    expect(changes.length).toBe(1);
    expect(changes[0]).toStrictEqual({ added: [item], removed: [] });
  });

  test('should emit change event on deselect', () => {
    const item = { id: 1, name: 'item1' };
    const model = new SelectionModel<typeof item>();
    const changes: SelectionModelChange<typeof item>[] = [];

    model.on('change', (change: SelectionModelChange<typeof item>) => {
      changes.push(change);
    });

    model.select(item);
    model.deselect(item);

    expect(changes.length).toBe(2);
    expect(changes[1]).toStrictEqual({ added: [], removed: [item] });
  });

  test('should emit change event on clear', () => {
    const item = { id: 1, name: 'item1' };
    const model = new SelectionModel<typeof item>();
    const changes: SelectionModelChange<typeof item>[] = [];

    model.on('change', (change: SelectionModelChange<typeof item>) => {
      changes.push(change);
    });

    model.select(item);
    expect(changes.length).toBe(1);

    model.clear();
    expect(changes.length).toBe(2);
    expect(changes[1]).toStrictEqual({ added: [], removed: [item] });
  });

  test('should emit change event on select all', () => {
    const items = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
    ];
    const model = new SelectionModel<(typeof items)[0]>();
    const changes: SelectionModelChange<(typeof items)[0]>[] = [];

    model.on('change', (change: SelectionModelChange<typeof items[0]>) => {
      changes.push(change);
    });

    model.selectMultiple(items);

    expect(changes.length).toBe(1);
    expect(changes[0]).toStrictEqual({ added: items, removed: [] });
  });

  test('should emit change event on deselect all', () => {
    const items = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
    ];
    const model = new SelectionModel<(typeof items)[0]>();
    const changes: SelectionModelChange<(typeof items)[0]>[] = [];

    model.on('change', (change: SelectionModelChange<typeof items[0]>) => {
      changes.push(change);
    });

    model.selectMultiple(items);
    model.deselectMultiple(items);

    expect(changes.length).toBe(2);
    expect(changes[1]).toStrictEqual({ added: [], removed: items });
  });

  test('should remove selection change listeners', () => {
    const item = { id: 1, name: 'item1' };
    const model = new SelectionModel<typeof item>();
    const changes: SelectionModelChange<typeof item>[] = [];

    const listenerId = model.on(
      'change',
      (change: SelectionModelChange<typeof item>) => {
        changes.push(change);
      },
    );

    model.select(item);

    expect(changes.length).toBe(1);
    expect(changes[0]).toStrictEqual({ added: [item], removed: [] });

    model.off('change', listenerId);

    model.deselect(item);
    expect(changes.length).toBe(1);
  });

  test('readme example', () => {
    interface MyItem {
      id: string;
      name: string;
    }

    const items: MyItem[] = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];

    // NOTE: the SelectionModel doesn't need a reference to the items array
    const selectionModel = new SelectionModel<MyItem>()
      // The `identifyBy` method is used to determine how to uniquely identify items.
      // The default implementation uses the items themselves as their identity: `(item: T) => item`
      .identifyBy((item) => item.id);

    selectionModel.toggle(items[0]);
    expect(selectionModel.getSelectedItems()).toStrictEqual([
      { id: '1', name: 'Item 1' },
    ]);
    expect(selectionModel.hasSelection).toBe(true);
    expect(selectionModel.hasSingleSelection).toBe(true);

    selectionModel.select(items[1]);
    expect(selectionModel.getSelectedItems()).toStrictEqual([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ]);

    selectionModel.deselect(items[0]);
    expect(selectionModel.getSelectedItems()).toStrictEqual([
      { id: '2', name: 'Item 2' },
    ]);

    selectionModel.clear();
    expect(selectionModel.getSelectedItems()).toStrictEqual([]);

    selectionModel.selectMultiple([items[0], items[2]]);
    expect(selectionModel.getSelectedItems()).toStrictEqual([
      { id: '1', name: 'Item 1' },
      { id: '3', name: 'Item 3' },
    ]);
    expect(selectionModel.isSelected(items[1])).toBe(false);
    expect(selectionModel.hasMultipleSelection).toBe(true);
    expect(selectionModel.selectionCount).toBe(2);

    selectionModel.deselectMultiple([items[0], items[2]]);

    selectionModel.destroy();
  });
});
