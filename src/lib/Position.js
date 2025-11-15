/**@import {PhysicsPosition, Coordinates} from "." */
import { createComponent } from "../ecs/Component.js";
import List from "../types/List.js"
function PositionComponent() {
      /**
       * @type {List<(pos: Coordinates) => void>}
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
            /**
             * 
             * @param {(pos: Coordinates) => void} callback 
             * @returns {() => void} - unsubscribe method
             */
            onMove(callback) {
                  let node = subs.push(callback);
                  return () => {
                        if (!node) {
                              return;
                        }
                        subs.remove(node);
                        node = null;
                  };
            },
      };
}
/**
 * @type {import("../ecs/Component.js").Component<Coordinates, unknown[]>}
 */
export const Position = createComponent(PositionComponent);