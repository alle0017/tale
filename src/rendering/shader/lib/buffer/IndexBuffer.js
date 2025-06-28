export class IndexBuffer {
      /**
       * @type {WebGLRenderingContext}
       */
      #gl;
      /**
       * @type {WebGLBuffer}
       */
      #buffer;
      /**
       * @param {WebGLRenderingContext} gl 
       */
      constructor(gl) {
            this.#gl = gl;
            this.#buffer = this.#gl.createBuffer();
      }

      /**
       * @param {number[]} values 
       * @param {number} dynamic
       */
      write(values, dynamic = this.#gl.STATIC_DRAW) {
            this.#gl.bindBuffer(this.#gl.ELEMENT_ARRAY_BUFFER, this.#buffer);

            this.#gl.bufferData(
                  this.#gl.ELEMENT_ARRAY_BUFFER, 
                  new Uint16Array(values),
                  dynamic
            );
      }

      bind() {
            this.#gl.bindBuffer(this.#gl.ELEMENT_ARRAY_BUFFER, this.#buffer);
      }
}