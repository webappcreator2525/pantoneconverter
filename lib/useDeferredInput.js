import { useDeferredValue } from 'react';

/**
 * Split a text input's value in two: the synchronous value the field itself
 * renders from, and a lagging copy to drive anything expensive off.
 *
 * Typing never waits on the expensive half. The caller keeps binding the
 * input's own `value` to the undeferred state, so characters and caret are
 * always immediate; the results list, suggestion menu or swatch grid catches up
 * at React's convenience and can be abandoned mid-render when the next
 * keystroke arrives.
 *
 * Why `useDeferredValue` rather than a debounce timer
 * ---------------------------------------------------
 * A ~130 ms debounce was built first and measured against the real export at 4x
 * CPU throttle. It was not better, so this is the version that shipped.
 * Worst-case input-handler time, typing at ~110 ms/char:
 *
 *                     no deferral   130 ms timer   useDeferredValue
 *   #hex-input           53.9 ms       44.6 ms         46.6 ms
 *   #pantone-search      49.4 ms       41.8 ms         47.4 ms
 *   #finder-search       64.2 ms       44.6 ms         43.9 ms
 *
 * The maxima are within each other's run-to-run noise; on the statistics that
 * hold still, `useDeferredValue` was ahead — median on #hex-input 25.4 ms vs
 * 31.1 ms, and p75 at a slow typing cadence 44.3 ms vs 62.1 ms. A fixed timer
 * also has a failure mode this does not: when someone types more slowly than
 * the delay, every keystroke settles on its own, so the timer buys no
 * coalescing at all and merely pushes the expensive render into the *next*
 * keystroke's event handler.
 *
 * The wrapper is kept rather than calling `useDeferredValue` at each call site,
 * so that if field data ever disagrees the strategy changes in one place
 * instead of four.
 *
 * Re-run the comparison with `node scripts/perf/measure.mjs inp`.
 *
 * @param {string} value The live, synchronous input value.
 * @returns {string} The lagging value — feed derived and expensive work from it.
 */
export function useDeferredInput(value) {
  return useDeferredValue(value);
}

export default useDeferredInput;
