/**@import Screen from "../screen/screen.js";*/

/**
 * @abstract
 * @interface
 */
export class Shader {
      /**
       * @abstract
       * @param {Screen} screen 
       */
      draw(screen) {
            throw new Error('draw method must be implemented');
      }
}