import Canvas from "../rendering/canvas.js";
import Platform from "../../platform/platform.js";
/**@import {Cell, HexColor} from "../rendering/canvas.js"; */

/**
 * class that represent any backend which can support 
 * drawing one pixel at time
 */
export default class Screen {
      /**
       * @type {Canvas}
       */
      #grid;

      /**
       * grid used to draw pixels onto
       */
      get grid() {
            return this.#grid;
      }

      constructor() {
            Platform.onPlatformChange(() => {
                  this.#resize();
            });
      }

      #resize() {
            Platform.instance.resize((width, height) => {
                  this.#grid = Platform.instance.canvas(width, height);
            });
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
            if (pixel.x < 0 || pixel.x >= this.#grid.width) {
                  return;
            }
            if (pixel.y < 0 || pixel.y >= this.#grid.height) {
                  return;
            }
            this.#grid.set(pixel);
            return pixel;
      }
      /**
       * set a pixel onto the screen.
       * {@link Screen.draw()} must be called to 
       * apply any change
       * @param {number} x
       * @param {number} y
       * @param {number} z
       * @param {HexColor} background 
       * @param {HexColor} color
       * @param {string} char  
       */
      setRaw(x, y, z, color, background, char) {
            if (x < 0 || x >= this.#grid.width) {
                  return;
            }
            if (y < 0 || y >= this.#grid.height) {
                  return;
            }
            this.#grid.setRaw(x, y, z, color, background, char);
      }
}