import { createSystem } from "../components/index.js"
import { usePhysicsPosition, } from "./Position.js";
/**@import {PhysicsPosition} from "." */

export const usePhysics = (() => {
      let last = performance.now();

      const system = createSystem(/**@param {PhysicsPosition[]} positions */positions => {
            const dt = performance.now() - last;
            
            for (const pos of positions) {
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
            }

            last = performance.now();
      });

      return () => {
            const pos =  usePhysicsPosition();

            system.add(pos);

            return pos;
      }
})()