/**
 * Perspective helpers
 * EN: Pure functions for perspective-related calculations.
 * HU: Tiszta függvények perspektíva számításokhoz (könnyű tesztelni).
 */
export class Perspective {
  /**
   * EN: Returns horizon Y based on height and ratio (0..1).
   * HU: Horizont Y koordinátája a magasság és arány alapján (0..1).
   */
  static horizonY(height, ratio) {
    return height * ratio;
  }

  /**
   * EN: Ratio (0..1) that describes "distance" from bottom to horizon.
   * HU: Arány (0..1), ami a távolságot jelzi az aljától a horizontig.
   */
  static distanceRatio(lineY, horizonY, height) {
    // 1 near bottom, 0 at horizon (but we clamp safety)
    // HU: 1 lent, 0 a horizontnál (biztonságosan clampelve)
    const denom = (height - horizonY) || 1;
    const r = 1 - (lineY - horizonY) / denom;
    return Math.max(0, Math.min(1, r));
  }

  /**
   * EN: Depth increases with scroll; controls narrowing.
   * HU: A depth a scroll-lal nő; az összeszűkülést vezérli.
   */
  static depth(scrollY, factor) {
    return scrollY * factor;
  }
}
