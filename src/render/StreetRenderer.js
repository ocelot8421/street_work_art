import { Perspective } from "../math/Perspective.js";

/**
 * StreetRenderer
 * EN: Knows how to draw the scene given state (scroll) + viewport size.
 * HU: Tudja hogyan kell kirajzolni a jelenetet (scroll + viewport méret alapján).
 */
export class StreetRenderer {
  constructor(config) {
    this.config = Object.freeze({ ...config });
  }

  /**
   * EN: Main render entry.
   * HU: Fő render belépési pont.
   */
  render({ ctx, width, height, scrollY }) {
    const c = this.config;

    // Clear frame / képkocka törlése
    ctx.clearRect(0, 0, width, height);

    // Style setup / stílus beállítás
    ctx.strokeStyle = c.strokeStyle;
    ctx.lineWidth = c.lineWidth;

    const horizonY = Perspective.horizonY(height, c.horizonRatio);
    const depth = Perspective.depth(scrollY, c.depthFactor);

    this.#drawRoadEdges(ctx, width, height, horizonY, c.roadWidth, depth);
    this.#drawCrossLines(ctx, width, height, horizonY, scrollY);
  }

  /**
   * EN: Draw the two perspective road edge lines.
   * HU: Az út két szélét rajzolja perspektivikusan.
   */
  #drawRoadEdges(ctx, width, height, horizonY, roadWidth, depth) {
    // EN: road narrows with "depth"; clamp so it doesn't invert
    // HU: az út szűkül a depth miatt; clamp, hogy ne forduljon át
    const narrowed = Math.max(40, roadWidth - depth);

    const leftX = width / 2 - narrowed / 2;
    const rightX = width / 2 + narrowed / 2;

    ctx.beginPath();
    ctx.moveTo(leftX, horizonY);
    ctx.lineTo(width / 2 - roadWidth, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightX, horizonY);
    ctx.lineTo(width / 2 + roadWidth, height);
    ctx.stroke();
  }

  /**
   * EN: Draw horizontal markings converging into the distance.
   * HU: Keresztvonalak (útjelzések) rajzolása a perspektívához.
   */
  #drawCrossLines(ctx, width, height, horizonY, scrollY) {
    const c = this.config;

    for (let i = 0; i < c.crossLineCount; i++) {
      // EN: move lines with scroll to create forward-motion feel
      // HU: scroll-lal "mozgatjuk" a vonalakat, mintha előre mennénk
      const lineY = height - i * c.crossLineSpacing + (scrollY % c.crossLineSpacing);
      if (lineY < horizonY) continue;

      const ratio = Perspective.distanceRatio(lineY, horizonY, height);
      const lineWidth = c.maxCrossLineWidth * ratio;

      ctx.beginPath();
      ctx.moveTo(width / 2 - lineWidth / 2, lineY);
      ctx.lineTo(width / 2 + lineWidth / 2, lineY);
      ctx.stroke();
    }
  }
}
