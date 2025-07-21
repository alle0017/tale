/**@import {PhysicsPosition, Position} from "." */
import { createComponent } from "../ecs/Component.js";
import List from "../types/List.js"

export const [
      position, 
      /**
       * position component that represent any point 
       * that can be moved in 2D space.
       */
      usePosition
] = createComponent('position', () => {
      /**
       * @type {List<(pos: Position) => void>}
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
             * @param {(pos: Position) => void} callback 
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
});