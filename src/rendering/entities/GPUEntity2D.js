/**@import GPUContext from "../index.d.ts" */
/**@import Screen from "../screen/screen.js";*/

/**
 * @enum {number}
 */
export const Primitive = {
      TRIANGLE: 3,
      LINES: 2,
      POINTS: 1,
}
/**
 * 
 * @param {Primitive} primitive 
 * @param {WebGLRenderingContext} gl
 */
export const toWebGLPrimitive = (primitive, gl) => {
      switch (primitive) {
            case Primitive.TRIANGLE: return gl.POINTS;
            case Primitive.LINES: return gl.LINES;
            case Primitive.POINTS: return gl.TRIANGLES;
      }
}
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
      zIndex = 0;
      /**
       * @type {Screen}
       */
      #screen;

      get screen() {
            return this.#screen;
      }
      /**
       * @abstract
       */
      draw() {
            throw new Error("draw is an abstract method that must be implemented");
      }
      /**
       * 
       * @param {Screen} screen 
       */
      $setScreen(screen) {
            this.#screen = screen;
      }
}