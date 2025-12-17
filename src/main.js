import { CanvasView } from "./core/CanvasView.js";
import { AnimationLoop } from "./core/AnimationLoop.js";
import { InputState } from "./core/InputState.js";
import { Camera } from "./math/Camera.js";
import { StreetRenderer3D } from "./render/StreetRenderer3D.js";

const canvasEl = document.getElementById("street");
const view = new CanvasView(canvasEl);
const input = new InputState(window);

const camera = new Camera({ fovDeg: 60, near: 0.1 });
camera.updateViewport(view.width, view.height);

const renderer = new StreetRenderer3D({ roadHalfWidth: 2, lineCount: 50, spacing: 3 });

view.attachAutoResize(window);
window.addEventListener("resize", () => camera.updateViewport(view.width, view.height));

const loop = new AnimationLoop(() => {
  renderer.render({ ctx: view.ctx, camera, scrollY: input.scrollY });
});

loop.start();
