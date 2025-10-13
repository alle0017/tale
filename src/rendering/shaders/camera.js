/**@import {Coordinates} from "../../lib/index.d.ts" */
export class Camera {
      x;
      y;
      z;

      /**
       * follow a position onto the screen
       * @param {Coordinates} position 
       */
      follow(position) {
            position.onMove(pos => {
                  this.x = pos.x;
                  this.y = pos.y;
            });
      }
}