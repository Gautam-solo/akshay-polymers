/**
 * Upper bound for a single animation step, in seconds.
 *
 * The render loop pauses when the hero scrolls out of view, and browsers also
 * throttle background tabs. On resume the first frame reports the whole gap as
 * its delta, which would advance the scene by seconds in one step and read as a
 * freeze followed by a jump. Clamping to ~3 frames keeps motion continuous.
 */
export const MAX_DELTA = 1 / 20
