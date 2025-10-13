import { Pipe } from "../pipe/pipe.js";
import Grid, { selectPrimitive } from "../rendering/grid.js";
/**@import {Pixel} from "../pipe/pipe" */
export default class Screen {
      #grid = new Grid(100, 50);
      #pipe = new Pipe();

      get pipe() {
            return this.#pipe;
      }

      constructor() {
            this.#pipe.use(this.#setPixelOnScreen)
      }

      /**
       * 
       * @param {Pixel} pixel 
       */
      #setPixelOnScreen(pixel) {
            if (pixel.x < 0 || pixel.x > this.#grid.width) {
                  return;
            }
            if (pixel.y < 0 || pixel.y > this.#grid.height) {
                  return;
            }
            const primitive = pixel.primitive || selectPrimitive(pixel.y);
            this.#grid.set(pixel.color, pixel.x, pixel.y, pixel.z, primitive);
            return pixel;
      }

      draw() {
            this.#grid.draw();
      }

      /**
       * 
       * @param {Pixel} pixel 
       */
      set(pixel) {
            this.#pipe.apply(pixel);
      }
}