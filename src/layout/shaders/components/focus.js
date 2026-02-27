/**@import {Node} from "../node.js" */
export class FocusComponent {
      /**
       * @type {Node}
       */
      static #activeElement = undefined;

      /**
       * @readonly
       * @type {Node}
       */
      #target;

      /**
       * 
       * @param {Node} target 
       */
      constructor(target) {
            this.#target = target;
      }
      
      hasFocus() {
            return FocusComponent.#activeElement && FocusComponent.#activeElement === this.#target;
      }
      focus() {
            FocusComponent.#activeElement = this.#target;
      }
      blur() {
            FocusComponent.#activeElement = undefined;
      }
}