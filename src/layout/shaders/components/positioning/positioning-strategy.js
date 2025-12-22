/**@import {Node} from "../../node.js" */

/**
 * @interface
 */
export class PositioningStrategy {
      /**
       * @readonly
       * @type {'none' | 'row' | 'column'}
       */
      static Id = 'none';
      /**
       * @type {PositioningStrategy}
       */
      static #Instance;
      static get() {
            if (!this.#Instance) {
                  this.#Instance = new PositioningStrategy();
            }
            return this.#Instance;
      }
      /**
       * @type {'none' | 'row' | 'column'}
       */
      Id = PositioningStrategy.Id;
      initialize() {
            // abstract stub
      }
      /**
       * @param {Node} parent 
       * @param {Node} children 
       * @param {number} top 
       * @param {number} left 
       */
      position(parent, children, top, left) {
            children.style.$offsetX = left + parent.style.paddingLeft;
            children.style.$offsetY = top + parent.style.paddingTop;
            //parent.style.clip(children);
      }
}