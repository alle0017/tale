import { useRendering } from "../Rendering.js";

/**@import {Coordinates} from "../../lib/index.d.ts" */
export class Camera {
      /**
       * @type {number}
       */
      x;
      /**
       * @type {number}
       */
      y;
      /**
       * @type {number}
       */
      z;

      /**
       * 
       * @param {import("../rendering/canvas.js").Cell} pixel 
       * @returns 
       */
      #filter = pixel => {
            pixel.x -= this.x;
            pixel.y -= this.y;
            pixel.z -= this.z;
            return pixel;
      }

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

      attach() {
            useRendering
            .CONTEXT
            .renderingPipeline
            .use(this.#filter)
      }
      detach() {
            useRendering
            .CONTEXT
            .renderingPipeline
            .remove(this.#filter)
      }
}