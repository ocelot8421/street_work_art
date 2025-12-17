/**
 * CanvasView
 * EN: Owns the canvas and its 2D context; handles sizing.
 * HU: Kezeli a canvast és a 2D contextet; méretezésért felel.
 */
export class CanvasView {
  #canvas;
  #ctx;

  constructor(canvasElement) {
    this.#canvas = canvasElement;
    this.#ctx = this.#canvas.getContext("2d");
    this.resizeTo(window.innerWidth, window.innerHeight);
  }

  get ctx() { return this.#ctx; }
  get width() { return this.#canvas.width; }
  get height() { return this.#canvas.height; }

  /**
   * EN: Resize internal drawing buffer (not CSS size).
   * HU: A belső rajzolási felbontást állítja (nem a CSS méretet).
   */
  resizeTo(width, height) {
    this.#canvas.width = width;
    this.#canvas.height = height;
  }

  /**
   * EN: Attach resize listener to keep canvas resolution in sync.
   * HU: Resize eseményre feliratkozik, hogy a felbontás mindig jó legyen.
   */
  attachAutoResize(win) {
    const onResize = () => this.resizeTo(win.innerWidth, win.innerHeight);
    win.addEventListener("resize", onResize);
    onResize();
  }
}
