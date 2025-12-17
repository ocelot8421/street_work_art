export class Camera {
  /**
   * EN: Simple pinhole camera for perspective projection.
   * HU: Egyszerű pinhole kamera perspektivikus projekcióhoz.
   */
  constructor({ fovDeg = 60, near = 0.1 } = {}) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.near = near;

    this.setFov(fovDeg);
  }

  setFov(fovDeg) {
    this.fovDeg = fovDeg;
  }

  /**
   * EN: Update focal length based on viewport height and FOV.
   * HU: Fókusztávolság számítása viewport magasság + FOV alapján.
   */
  updateViewport(width, height) {
    this.width = width;
    this.height = height;
    const fovRad = (this.fovDeg * Math.PI) / 180;
    this.f = (height * 0.5) / Math.tan(fovRad * 0.5);
    this.cx = width * 0.5;
    this.cy = height * 0.5;
  }

  /**
   * EN: Projects a world-space point (X,Y,Z) to screen (px,py).
   * HU: Világpontot (X,Y,Z) vászonpontra (px,py) vetít.
   */
  project(X, Y, Z) {
    const Xc = X - this.x;
    const Yc = Y - this.y;
    const Zc = Z - this.z;

    if (Zc <= this.near) return null; // behind/too close / HU: túl közel vagy mögötte

    const sx = (this.f * Xc) / Zc;
    const sy = (this.f * Yc) / Zc;

    return {
      x: this.cx + sx,
      y: this.cy - sy,
      z: Zc,
    };
  }
}
