import { useSystem } from "../ecs/System.js"
import { createComponent } from "../ecs/Component.js";
import * as List from "../types/List.js"
/**@import {PhysicsPosition} from "." */

export const [physics, usePhysics] = createComponent('physics', () => {
      /**
       * @type {List.Root<(pos: PhysicsPosition) => void>}
       */
      const subs = List.create();
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

                  List.forEach(subs, sub => sub(this));
            },
            get y() {
                  return y;
            },
            set y(v) {
                  if (y === v) {
                        return;
                  }

                  y = v;

                  List.forEach(subs, sub => sub(this));
            },
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            /**
             * 
             * @param {(pos: PhysicsPosition) => void} callback 
             * @returns {() => void} - unsubscribe method
             */
            onMove(callback) {
                  let node = List.push(subs, callback);
                  return () => {
                        if (!node) {
                              return;
                        }
                        
                        List.remove(subs, node)
                        node = null;
                  };
            },
      };
});

export const usePhysicsSystem = () => {
      let last = performance.now();

      return useSystem(/**@param {{ physics: PhysicsPosition }} position */position => {
            const dt = performance.now() - last;
            const pos = position.physics;
            
            if (pos.ax) {
                  pos.vx += pos.ax*dt;
            }

            if (pos.ay) {
                  pos.vy += pos.ay*dt;
            }

            if (pos.vx) {
                  pos.x += pos.vx*dt + pos.ax*pos.ax*dt/2;
            }

            if (pos.vy) {
                  pos.y += pos.vy*dt + pos.ay*pos.ay*dt/2;
            }
            last = performance.now();
      }, physics);
}