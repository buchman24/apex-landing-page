// @ts-check
/**
 * Camera maths shared by the WebGL engine, the poster capture and the page
 * (which projects the two hero labels before WebGL is running).
 */

/** @typedef {[number, number, number]} Vec3 */
/** @typedef {{ eye: Vec3, target: Vec3, l: number, r: number, b: number, t: number }} Frame */


/** Wide reference frame, tall reference frame, and the switch between them. */
export const WIDE = 16 / 9, TALL = 9 / 16, BREAK = 4 / 5;

/**
 * Frame a camera key for a viewport aspect. Landscape viewports crop a 16:9
 * reference frame the way `object-fit: cover; object-position: right bottom`
 * crops the wide poster. Portrait viewports (aspect <= 4:5: phones, iPads upright)
 * use a 9:16 reference: the eye pulls back and the frame keeps the right part of the
 * wide composition, where the mountain lives, leaving sky on top. `pan` moves that
 * portrait reference sideways, as a fraction of its width (negative pans left);
 * close camera keys use it to keep the summit in frame on phones.
 * @param {Vec3} eye @param {Vec3} target @param {number} fov vertical, degrees, for 16:9
 * @param {number} aspect width / height
 * @param {number} [pan]
 * @returns {Frame}
 */
export function frame(eye, target, fov, aspect, pan = 0) {
  const T = Math.tan((fov * Math.PI) / 360);
  let l = -T * WIDE, r = T * WIDE, b = -T, t = T, A = WIDE, e = eye;
  if (aspect <= BREAK) {
    const k = 1.3;
    e = /** @type {Vec3} */ (eye.map((v, i) => target[i] + (v - target[i]) * k));
    const w = (0.9 * T * WIDE) / k;
    l = pan * w;
    r = l + w;
    b = (-0.72 * T) / k;
    t = b + (r - l) / TALL;
    A = TALL;
  }
  if (aspect > A) t = b + (r - l) / aspect;
  else l = r - (t - b) * aspect;
  return { eye: e, target, l, r, b, t };
}

/**
 * Column-major view matrix.
 * @param {ArrayLike<number>} e eye @param {ArrayLike<number>} c target
 * @param {Float32Array} [out]
 */
export function lookAt(e, c, out = new Float32Array(16)) {
  let fx = e[0] - c[0], fy = e[1] - c[1], fz = e[2] - c[2];
  let l = Math.hypot(fx, fy, fz);
  fx /= l; fy /= l; fz /= l;
  let rx = fz, rz = -fx; // up × f with up = +y
  l = Math.hypot(rx, rz);
  rx /= l; rz /= l;
  const ux = fy * rz, uy = fz * rx - fx * rz, uz = -fy * rx;
  out.set([rx, ux, fx, 0, 0, uy, fy, 0, rz, uz, fz, 0,
    -(rx * e[0] + rz * e[2]), -(ux * e[0] + uy * e[1] + uz * e[2]), -(fx * e[0] + fy * e[1] + fz * e[2]), 1]);
  return out;
}

/**
 * Off-axis perspective projection from tangent extents, times a view matrix.
 * @param {Frame} f @param {number} near @param {number} far
 * @param {Float32Array} [out]
 */
export function perspective(f, near, far, out = new Float32Array(16)) {
  const v = lookAt(f.eye, f.target);
  const sx = 2 / (f.r - f.l), sy = 2 / (f.t - f.b);
  const ox = (f.r + f.l) / (f.r - f.l), oy = (f.t + f.b) / (f.t - f.b);
  const A = -(far + near) / (far - near), B = (-2 * far * near) / (far - near);
  for (let c = 0; c < 4; c++) {
    const x = v[c * 4], y = v[c * 4 + 1], z = v[c * 4 + 2], w = v[c * 4 + 3];
    out[c * 4] = sx * x + ox * z;
    out[c * 4 + 1] = sy * y + oy * z;
    out[c * 4 + 2] = A * z + B * w;
    out[c * 4 + 3] = -z;
  }
  return out;
}
