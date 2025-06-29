/**@import {PhysicsPosition, Position} from "." */

/**
 * position component that represent any point 
 * that can be moved in 2D space.
 * @returns {Position}
 */
export const usePosition = () => {
      /**
       * @type {Set<(pos: Position) => void>}
       */
      const subs = new Set();
      let x = 0;
      let y = 0;

      return {
            get x() {
                  return x;
            },
            set x(v) {
                  if (x === v) {
                        return;
                  }

                  x = v;

                  for (const sub of subs) {
                        sub(this);
                  }
            },
            get y() {
                  return y;
            },
            set y(v) {
                  if (y === v) {
                        return;
                  }

                  y = v;

                  for (const sub of subs) {
                        sub(this);
                  }
            },
            onMove(callback) {
                  subs.add(callback);
                  return () => subs.delete(callback);
            }
      };
}


/**
 * @returns {PhysicsPosition}
 */
export const usePhysicsPosition = () => {
      /**
       * @type {Set<(pos: Position) => void>}
       */
      const subs = new Set();
      let x = 0;
      let y = 0;

      return {
            get x() {
                  return x;
            },
            set x(v) {
                  if (x === v) {
                        return;
                  }

                  x = v;

                  for (const sub of subs) {
                        sub(this);
                  }
            },
            get y() {
                  return y;
            },
            set y(v) {
                  if (y === v) {
                        return;
                  }

                  y = v;

                  for (const sub of subs) {
                        sub(this);
                  }
            },

            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,

            onMove(callback) {
                  subs.add(callback);
                  return () => subs.delete(callback);
            }
      };
}
