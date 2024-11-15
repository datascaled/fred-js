import { prefersReducedMotion } from '@lou/a11y';
import { clamp01, invLerp } from '@lou/math';
import type { EasingFunction } from './easings.ts';

export type TransitionRenderFunction = (t: number) => void;

export interface TransitionOptions {
  /**
   * Render function that will be called with a value t, representing the progress of the animation.
   */
  render: TransitionRenderFunction;

  /**
   * In milliseconds.
   */
  duration: number;

  /**
   * An easing function that takes a value t between 0 and 1 and returns a new t.
   */
  easing: EasingFunction;

  /**
   * Whether to respect the user's preference for reduced motion. When true, the animation is skipped and the render function is called with t = 1.
   */
  respectPrefersReducedMotion?: boolean;

  /**
   * Called when the animation is canceled.
   */
  onCanceled?: () => void;

  /**
   * Called when the animation was finished.
   */
  onFinished?: () => void;

  /**
   * Called regardless of whether the animation was finished or canceled.
   */
  onCompleted?: () => void;
}

export interface TransitionHandle {
  /**
   * A promise that resolves when the animation has finished or was canceled.
   */
  completed: Promise<void>;

  /**
   * Cancels the animation.
   */
  cancel(): void;
}

/**
 * Creates a transition animation that calls the render function with a value t between 0 and 1.
 *
 * @param options - The options for the transition animation.
 * @returns The transition handle.
 */
export function transition(options: TransitionOptions): TransitionHandle {
  if (options.respectPrefersReducedMotion && prefersReducedMotion()) {
    options.render(1);
    options.onFinished?.();
    options.onCompleted?.();
    return {
      completed: Promise.resolve(),
      cancel: () => {
        options.onCanceled?.();
      },
    };
  }

  let canceled = false;

  const finished = new Promise<void>((resolve) => {
    const start = performance.now();

    requestAnimationFrame(function frame(time) {
      if (canceled) {
        options.onCanceled?.();
        options.onCompleted?.();
        resolve();
        return;
      }

      const t = clamp01(invLerp(time, start, start + options.duration));
      const easedT = options.easing(t);
      const roundedT = Math.round(easedT * 10_000) / 10_000;

      options.render(roundedT);

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        options.onFinished?.();
        options.onCompleted?.();
        resolve();
      }
    });
  });

  return {
    completed: finished,
    cancel: () => {
      canceled = true;
    },
  };
}
