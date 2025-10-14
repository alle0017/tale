import { Pipe } from "../pipe/pipe.js";
import Grid, { selectPrimitive } from "../rendering/grid.js";
/**@import {Pixel} from "../pipe/pipe.js" */
export default class Screen {
      #grid = new Grid(100, 50);
      #pipe = new Pipe();

      get pipe() {
            return this.#pipe;
      }

      get grid() {
            return this.#grid;
      }

      constructor() {
            this.#pipe.use(pixel => this.#setPixelOnScreen(pixel))
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
            this.#grid.set(pixel.color, pixel.x, pixel.y, pixel.z);
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