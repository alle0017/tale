import Shape from "./shader/Shape";

export default class Context {
      /**
       * @type {WebGLRenderingContext}
       */
      #ctx;

      constructor() {
            const cvs = document.createElement('canvas');

            document.body.appendChild(cvs);

            this.#ctx = cvs.getContext('webgl');
      }

      fillRect() {
            new Shape(this.#ctx, [
                  1,0,
                  0,1,
                  0,0,
                  1,1
            ]);
      }
}