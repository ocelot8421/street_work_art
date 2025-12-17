/**
 * InputState
 * EN: Central place for "live" input state (scroll, later maybe mouse/keys).
 * HU: Központi input állapot (scroll, később egér/billentyű is).
 */
export class InputState {
  #win;
  scrollY = 0;

  constructor(win) {
    this.#win = win;
    this.#bind();
  }

  #bind() {
    const update = () => { this.scrollY = this.#win.scrollY || 0; };
    this.#win.addEventListener("scroll", update, { passive: true });
    update();
  }
}
