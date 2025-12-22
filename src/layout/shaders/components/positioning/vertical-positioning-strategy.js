import { PositioningStrategy } from "./positioning-strategy.js";
/**@import {Node} from "../../node.js" */

/**
 * @implements {PositioningStrategy}
 */
export class VerticalPositioningStrategy extends PositioningStrategy {
      /**
       * @readonly
       */
      static Id = 'column';
      /**
       * @type {VerticalPositioningStrategy}
       */
      static #Instance;
      static get() {
            if (!this.#Instance) {
                  this.#Instance = new VerticalPositioningStrategy();
            }
            return this.#Instance;
      }
      /**
       * @type {'none' | 'row' | 'column'}
       */
      Id = VerticalPositioningStrategy.Id;
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
            children.style.$offsetX = left + parent.style.paddingLeft;
            children.style.$offsetY = top + parent.style.paddingTop + this.#offset + parent.style.rowGap;
            this.#offset += children.style.height + parent.style.rowGap;
      }
}