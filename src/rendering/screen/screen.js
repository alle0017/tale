import { Pipe } from "../pipe/pipe.js";
import Canvas from "../rendering/canvas.js";
/**@import {Cell} from "../rendering/canvas.js"; */

/**
 * class that represent any backend which can support 
 * drawing one pixel at time
 */
export default class Screen {
      /**
       * @type {Canvas}
       */
      #grid;
      #pipe = new Pipe();

      /**
       * pipeline used to render pixels.
       * any pixel drawn on screen can be modified 
       * through functions attached to the pipeline
       */
      get pipe() {
            return this.#pipe;
      }

      /**
       * grid used to draw pixels onto
       */
      get grid() {
            return this.#grid;
      }

      constructor() {
            this.#resize();
            this.#pipe.use(pixel => this.#setPixelOnScreen(pixel));
      }

      #resize() {
            //@ts-ignore
            this.#grid = new Canvas(process.stdout.columns, process.stdout.rows);
            //@ts-ignore
            process.on('SIGWINCH', () => {
                  //@ts-ignore
                  this.#grid = new Canvas(process.stdout.columns, process.stdout.rows);
            });
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

      /**
       * draw the whole grid onto the screen
       * > note that if no change is detected from the last re-draw, then 
       * this method doesn't perform any action
       */
      draw() {
            this.#grid.draw();
      }

      /**
       * set a pixel onto the screen.
       * {@link Screen.draw()} must be called to 
       * apply any change
       * @param {Cell} pixel 
       */
      set(pixel) {
            this.#pipe.apply(pixel);
      }
}