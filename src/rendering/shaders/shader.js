/**@import Screen from "../screen/screen.js";*/

/**
 * abstract class that represent any type
 * of object that can be draw on a screen
 * object
 * @abstract
 * @interface
 */
export class Shader {
      /**
       * method used to manually set pixel that must be drawn onto the
       * screen.
       * @abstract
       * @param {Screen} screen 
       */
      draw(screen) {
            throw new Error('draw method must be implemented');
      }
}