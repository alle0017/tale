import { SharedUniformBuffer } from "../lib/buffer/SharedUniformBuffer.js";

export class Camera {
      /**
       * @readonly
       * @type {WebGLRenderingContext}
       */
      #gl;
      /**
       * @readonly
       * @type {SharedUniformBuffer}
       */
      #buffer;

      /**
       * @param {WebGLRenderingContext} gl 
       */
      constructor(gl) {
            this.#gl = gl;
            this.#buffer = new SharedUniformBuffer(this.#gl, 'mat3');
      }

      /**
       * bind the camera to the specified program.
       * @param {WebGLProgram} program - program to bound
       * @param {string} name - name of the uniform used inside the program
       * to represent the camera
       */
      bind(program, name) {
            this.#buffer.bind(program, name);
      }
}