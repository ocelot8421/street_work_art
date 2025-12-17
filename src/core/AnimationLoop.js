/**
 * AnimationLoop
 * EN: requestAnimationFrame loop wrapper.
 * HU: requestAnimationFrame ciklus absztrakció.
 */
export class AnimationLoop {
  #tick;
  #rafId = null;

  constructor(tickFn) {
    this.#tick = tickFn;
  }

  start() {
    const step = () => {
      this.#tick();
      this.#rafId = requestAnimationFrame(step);
    };
    if (this.#rafId == null) step();
  }

  stop() {
    if (this.#rafId != null) cancelAnimationFrame(this.#rafId);
    this.#rafId = null;
  }
}
