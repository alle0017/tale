/**@import {PhysicsPosition, Position} from "." */
import { createComponent } from "../ecs/Component.js";
import * as List from "../types/List.js"

export const [
      position, 
      /**
       * position component that represent any point 
       * that can be moved in 2D space.
       */
      usePosition
] = createComponent('position', () => {
      /**
       * @type {List.Root<(pos: Position) => void>}
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
            /**
             * 
             * @param {(pos: Position) => void} callback 
             * @returns {() => void} - unsubscribe method
             */
            onMove(callback) {
                  let node = List.push(subs, callback);
                  return () => {
                        if (!node) {
                              return;
                        }
                        List.remove(subs,node);
                        node = null;
                  };
            },
      };
});