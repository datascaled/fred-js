export function prefersReducedMotion() {
    return globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
