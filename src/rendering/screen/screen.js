import { Pipe } from "../pipe/pipe.js";
import Canvas from "../rendering/canvas.js";
/**@import {Cell} from "../rendering/canvas.js"; */
export default class Screen {
      #grid = new Canvas(100, 20);
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
       * @param {Cell} pixel 
       */
      #setPixelOnScreen(pixel) {
            if (pixel.x < 0 || pixel.x > this.#grid.width) {
                  return;
            }
            if (pixel.y < 0 || pixel.y > this.#grid.height) {
                  return;
            }
            this.#grid.set(pixel);
            return pixel;
      }

      draw() {
            this.#grid.draw();
      }

      /**
       * 
       * @param {Cell} pixel 
       */
      set(pixel) {
            this.#pipe.apply(pixel);
      }
}