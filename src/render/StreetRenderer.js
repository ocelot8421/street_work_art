export class StreetRenderer3D {
  /**
   * EN: Draws a simple road in 3D then projects to 2D.
   * HU: 3D-ben felépíti az utat, majd 2D-be projektálja.
   */
  constructor({ roadHalfWidth = 2, lineCount = 40, spacing = 2 } = {}) {
    this.roadHalfWidth = roadHalfWidth;
    this.lineCount = lineCount;
    this.spacing = spacing;
  }

  render({ ctx, camera, scrollY }) {
    // EN: Move camera forward based on scroll
    // HU: Kamera előretolása scroll alapján
    camera.z = scrollY * 0.02;

    ctx.clearRect(0, 0, camera.width, camera.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";

    // Road edges (two 3D lines)
    this.#draw3DLine(ctx, camera, -this.roadHalfWidth, 0, camera.z + 2, -this.roadHalfWidth, 0, camera.z + 200);
    this.#draw3DLine(ctx, camera, +this.roadHalfWidth, 0, camera.z + 2, +this.roadHalfWidth, 0, camera.z + 200);

    // Cross lines at different Z
    for (let i = 0; i < this.lineCount; i++) {
      const z = camera.z + 5 + i * this.spacing;
      this.#draw3DLine(ctx, camera, -this.roadHalfWidth, 0, z, +this.roadHalfWidth, 0, z);
    }
  }

  #draw3DLine(ctx, camera, x1, y1, z1, x2, y2, z2) {
    const p1 = camera.project(x1, y1, z1);
    const p2 = camera.project(x2, y2, z2);
    if (!p1 || !p2) return;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}
