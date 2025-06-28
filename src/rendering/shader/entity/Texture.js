import GPUEntity2D from "./GPUEntity2D.js";
/**@import GPUContext from "../../index" */

export default class TextureEntity extends GPUEntity2D {
      /**
       * @type {string}
       */
      image;

      get indices() {
            return [
                  0, 1, 2,
                  0, 2, 3,
            ];
      }

      /**
       * draw this into the provided
       * context
       * @param {GPUContext} ctx 
       */
      draw(ctx) {
            ctx.drawImage(this);
      }

      /**
       * remove this from the provided
       * context
       * @param {GPUContext} ctx 
       */
      remove(ctx) {
            ctx.clearImage(this);
      }
}