import { PositioningStrategy } from "./positioning-strategy.js";
/**@import {Node} from "../../node.js" */

/**
 * @implements {PositioningStrategy}
 */
export class HorizontalPositioningStrategy extends PositioningStrategy {
      /**
       * @readonly
       */
      static Id = 'row';
      /**
       * @type {HorizontalPositioningStrategy}
       */
      static #Instance;
      static get() {
            if (!this.#Instance) {
                  this.#Instance = new HorizontalPositioningStrategy();
            }
            return this.#Instance;
      }
      /**
       * @type {'none' | 'row' | 'column'}
       */
      Id = HorizontalPositioningStrategy.Id;
      #offset = 0;

      initialize() {
            this.#offset = 0;
      }
      /**
       * @param {Node} parent 
       * @param {Node} children 
       * @param {number} top 
       * @param {number} left 
       */
      position(parent, children, top, left) {
            children.style.$offsetX = left + parent.style.paddingLeft + this.#offset + parent.style.columnGap;
            children.style.$offsetY = top + parent.style.paddingTop;
            this.#offset += children.style.width + parent.style.columnGap;
      }
}