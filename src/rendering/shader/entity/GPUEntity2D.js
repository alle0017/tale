/**@import GPUContext from "../../index" */
/**
 * @abstract
 */
export default class GPUEntity2D {
      x = 0; 
      y = 0;
      scaleY = 1;
      scaleX = 1;
      rotation = 0;
      light = 1;
      /**
       * @abstract
       * @param {GPUContext} ctx 
       */
      draw(ctx) {
            throw new Error("draw is an abstract method that must be implemented");
      }

      /**
       * @abstract
       * @param {GPUContext} ctx 
       */
      remove(ctx) {
            throw new Error("remove is an abstract method that must be implemented");
      }
}