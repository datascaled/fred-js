import { expect } from '@std/expect';
import { describe, test } from '@std/testing/bdd';
import { EventBus } from './event-bus.ts';

describe('EventBus', () => {
  test('should create', () => {
    const eventBus = new EventBus();
    expect(eventBus).toBeInstanceOf(EventBus);
  });

  test('should have name', () => {
    const eventBus = new EventBus('test');
    expect(eventBus.name).toBe('test');
  });

  test('should call listener', () => {
    const eventBus = new EventBus();

    let calledCount = 0;
    eventBus.on('test', () => {
      calledCount++;
    });

    eventBus.emit('test');

    expect(calledCount).toBe(1);
  });

  test('should call listener with data', () => {
    const eventBus = new EventBus<{ test: string | null }>();

    let data: string | null = null;
    eventBus.on('test', (d: string | null) => {
      data = d;
    });

    eventBus.emit('test', 'data');

    expect(data).toBe('data');
  });

  test('should call multiple listeners', () => {
    const eventBus = new EventBus();

    let calledCount1 = 0;
    eventBus.on('test', () => {
      calledCount1++;
    });

    let calledCount2 = 0;
    eventBus.on('test', () => {
      calledCount2++;
    });

    eventBus.emit('test');

    expect(calledCount1).toBe(1);
    expect(calledCount2).toBe(1);
  });

  test('should call listeners multiple times', () => {
    const eventBus = new EventBus();

    let calledCount1 = 0;
    eventBus.on('test', () => {
      calledCount1++;
    });

    let calledCount2 = 0;
    eventBus.on('test', () => {
      calledCount2++;
    });

    eventBus.emit('test');
    eventBus.emit('test');

    expect(calledCount1).toBe(2);
    expect(calledCount2).toBe(2);
  });

  test('should not call removed listener', () => {
    const eventBus = new EventBus();

    let calledCount = 0;
    const listener = () => {
      calledCount++;
    };

    eventBus.on('test', listener);
    eventBus.emit('test');

    eventBus.off('test', listener);
    eventBus.emit('test');

    expect(calledCount).toBe(1);
  });

  test('should be able to remove listener by id', () => {
    const eventBus = new EventBus();

    eventBus.on('test', () => {
      // dummy
    });

    let calledCountCount = 0;
    const id = eventBus.on('test', () => {
      calledCountCount++;
    });

    eventBus.on('test', () => {
      // dummy
    });

    eventBus.emit('test');
    expect(calledCountCount).toBe(1);

    eventBus.off('test', id);
    eventBus.emit('test');

    expect(calledCountCount).toBe(1);
  });

  test('should remove same listener if added multiple times', () => {
    const eventBus = new EventBus();

    let calledCount = 0;
    const listener = () => {
      calledCount++;
    };

    eventBus.on('test', listener);
    eventBus.on('test', listener);
    eventBus.on('test', listener);

    eventBus.emit('test');

    expect(calledCount).toBe(3);

    eventBus.off('test', listener);
    eventBus.emit('test');

    expect(calledCount).toBe(3);
  });

  test('should only call once', () => {
    const eventBus = new EventBus();

    let calledCount = 0;
    eventBus.on(
      'test',
      () => {
        calledCount++;
      },
      { once: true }
    );

    eventBus.emit('test');
    eventBus.emit('test');
    eventBus.emit('test');

    expect(calledCount).toBe(1);
  });

  test('should clear', () => {
    const eventBus = new EventBus();

    let calledCount = 0;
    eventBus.on('test', () => {
      calledCount++;
    });

    eventBus.on('test2', () => {
      calledCount++;
    });

    eventBus.on('test3', () => {
      calledCount++;
    });

    eventBus.clear();
    eventBus.emit('test');
    eventBus.emit('test2');
    eventBus.emit('test3');

    expect(calledCount).toBe(0);
  });
});
