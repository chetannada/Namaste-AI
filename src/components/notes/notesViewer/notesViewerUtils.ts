export const MIN_ZOOM = 0.75;
export const MAX_ZOOM = 2.5;
export const ZOOM_STEP = 0.25;
export const BASE_NOTE_HEIGHT = "72vh";

export const emptySubscribe = () => () => {};

export function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

export function touchDistance(a: Touch, b: Touch) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}
