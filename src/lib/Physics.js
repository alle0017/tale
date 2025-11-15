import { useSystem } from "../ecs/System.js"
import { createComponent } from "../ecs/Component.js";
import List from "../types/List.js"
import { Position } from "./Position.js";
/**@import {PhysicsPosition} from "." */
function PhysicsComponent() {
      /**
       * @type {List<(pos: PhysicsPosition) => void>}
       */
      const subs = new List();
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

                  subs.forEach(sub => sub(this));
            },
            get y() {
                  return y;
            },
            set y(v) {
                  if (y === v) {
                        return;
                  }

                  y = v;

                  subs.forEach(sub => sub(this));
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
                  let node = subs.push(callback);
                  return () => {
                        if (!node) {
                              return;
                        }
                        
                        subs.remove(node)
                        node = null;
                  };
            },
      };
}
/**
 * @type {import("../ecs/Component.js").Component<PhysicsPosition, unknown[]>}
 */
export const Physics = createComponent(PhysicsComponent, Position);

export const usePhysicsSystem = () => {
      let last = performance.now();

      return useSystem(/**@param {import("../ecs/Entity.js").Entity} position */position => {
            const dt = performance.now() - last;
            const pos = position.get(Physics);
            
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
      }, Physics);
}