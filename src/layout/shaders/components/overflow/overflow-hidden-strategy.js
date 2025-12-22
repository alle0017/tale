import { OverflowStrategy } from "./overflow-strategy.js";
/**@import {Node} from "../../node.js" */

/**
 * @implements {OverflowStrategy}
 */
export class OverflowHiddenStrategy extends OverflowStrategy {
      static Id = 1;

      Id = OverflowHiddenStrategy.Id;
      /**
       * @type {OverflowStrategy}
       */
      static #Instance;
      static get() {
            if (!this.#Instance) {
                  this.#Instance = new OverflowHiddenStrategy();
            }
            return this.#Instance;
      }
      /**
       * 
       * @param {Node} child 
       * @param {number} height 
       * @param {number} width 
       * @param {number} x
       * @param {number} y  
       */
      clip(child, x, y, width, height) {
            const boundingBox = {
                  startX: x - 1,
                  startY: y,
                  endX: x + width,
                  endY: y + height,
            };
            const stack = [child];

            while (stack.length > 0) {
                  stack[0].style.boundingBox.boundingBox = boundingBox;
                  stack.push(...stack[0].children);
                  stack.shift();
            }
      }
}