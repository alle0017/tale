import { createComponent } from "../../ecs/Component.js";
import { useSystem } from "../../ecs/System.js";
import { Position } from "../../lib/Position.js";

/**@import {Coordinates} from "../../lib/index.d.ts" */

export const Camera = createComponent(() => {
      const camera = {
            /**
             * @type {number}
             */
            x: 0,
            /**
             * @type {number}
             */
            y: 0,
            /**
             * follow a position onto the screen
             * @param {Coordinates} position 
             */
            follow(position) {
                  return position.onMove(pos => {
                        this.x = pos.x;
                        this.y = pos.y;
                  });
            }
      };

      useSystem(entity => {
            entity.get(Position).x += camera.x;
            entity.get(Position).y += camera.y;
      }, Position);

      return camera;
})
