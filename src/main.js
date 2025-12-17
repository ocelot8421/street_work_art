import { CanvasView } from "./core/CanvasView.js";
import { AnimationLoop } from "./core/AnimationLoop.js";
import { InputState } from "./core/InputState.js";
import { StreetRenderer } from "./render/StreetRenderer.js";

const canvasEl = document.getElementById("street");

/**
 * App bootstrap / alkalmazás indítása
 * EN: wires dependencies together, HU: összeköti a komponenseket.
 */
const view = new CanvasView(canvasEl);
const input = new InputState(window);
const renderer = new StreetRenderer({
  strokeStyle: "white",
  lineWidth: 2,
  horizonRatio: 0.3,
  roadWidth: 400,
  depthFactor: 0.5,
  crossLineCount: 30,
  crossLineSpacing: 100,
  maxCrossLineWidth: 200,
});

const loop = new AnimationLoop(() => {
  renderer.render({
    ctx: view.ctx,
    width: view.width,
    height: view.height,
    scrollY: input.scrollY,
  });
});

view.attachAutoResize(window); // EN: auto resize handling / HU: automatikus átméretezés
loop.start();
