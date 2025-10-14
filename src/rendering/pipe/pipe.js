/**@import {Cell} from "../rendering/canvas.js"; */
/**
 * @typedef {{ 
 * x: number, 
 * y: number, 
 * z: number, 
 * color: import("../rendering/canvas.js").HexColor,
 * }} Pixel
 */

import OrderedList from "../../types/OrderedList.js";

export class Pipe {
      /**
       * @type {OrderedList<(pixel: Cell) => Cell | undefined>}
       */
      #pipe = new OrderedList();     

      /**
       * 
       * @param {Cell} pixel 
       */
      apply(pixel) {
            for (const filter of this.#pipe) {
                  pixel = filter(pixel);

                  if (!pixel) {
                        return;
                  }
            }
      }
      /**
       * 
       * @param {(pixel: Cell) => Cell | undefined} filter 
       */
      use(filter) {
            this.#pipe.push(filter);
      }
      /**
       * 
       * @param {(pixel: Cell) => Cell | undefined} filter 
       */
      remove(filter) {
            this.#pipe.delete(filter);
      }
}