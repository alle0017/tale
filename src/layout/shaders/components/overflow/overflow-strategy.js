/**@import {Node} from "../../node.js" */

/**
 * @interface
 */
export class OverflowStrategy {
      static Id = 0;
      /**
       * @type {OverflowStrategy}
       */
      static #Instance;
      static get() {
            if (!this.#Instance) {
                  this.#Instance = new OverflowStrategy();
            }
            return this.#Instance;
      }
      Id = OverflowStrategy.Id;
      /**
       * 
       * @param {Node} child 
       * @param {number} height 
       * @param {number} width 
       * @param {number} x
       * @param {number} y  
       */
      clip(child, x, y, width, height) {}
}