/**
 * @typedef {{ 
 * x: number, 
 * y: number, 
 * z: number, 
 * color: import("../rendering/grid.js").HexColor,
 * primitive?: string,
 * }} Pixel
 */

import OrderedList from "../../types/OrderedList.js";

export class Pipe {
      /**
       * @type {OrderedList<(pixel: Pixel) => Pixel | undefined>}
       */
      #pipe = new OrderedList();     

      /**
       * 
       * @param {Pixel} pixel 
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
       * @param {(pixel: Pixel) => Pixel | undefined} filter 
       */
      use(filter) {
            this.#pipe.push(filter);
      }
      /**
       * 
       * @param {(pixel: Pixel) => Pixel | undefined} filter 
       */
      remove(filter) {
            this.#pipe.delete(filter);
      }
}