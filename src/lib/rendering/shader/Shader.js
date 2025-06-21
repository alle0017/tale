import {Buffer} from "./buffer/Buffer.js";
import { UniformBuffer } from "./buffer/UniformBuffer.js";
import { extractAttributeType, extractUniformType } from "./Token.js";
import { IndexBuffer } from "./buffer/IndexBuffer.js";
export default class Shader {
      /**
       * @type {WebGLRenderingContext}
       * @readonly
       */
      #gl;
      /**
       * @type {WebGLProgram}
       * @readonly
       */
      #program;

      /**
       * @type {string}
       * @readonly
       */
      #source;

      /**
       * @param {WebGLRenderingContext} gl 
       * @param {string} vertex
       * @param {string} fragment 
       */
      constructor(gl, vertex, fragment) {
            this.#gl = gl
            this.#program = this.#createProgram(vertex, fragment);
            this.#source = vertex + fragment;
      }

      /**
       * 
       * @param {string} source
       * @param {GLenum} type 
       */
      #compileShader(source, type) {
            const shader = this.#gl.createShader(type);

            this.#gl.shaderSource(shader, source);
            this.#gl.compileShader(shader);

            const success = this.#gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS);

            if (!success) {
                  const log = this.#gl.getShaderInfoLog(shader);

                  this.#gl.deleteShader(shader);

                  throw new Error(log)
            }
 
            return shader;
      }

      /**
       * @param {string} vert 
       * @param {string} frag 
       */
      #createProgram(vert, frag) {
            const vertex = this.#compileShader(vert, this.#gl.VERTEX_SHADER);
            const fragment = this.#compileShader(frag, this.#gl.FRAGMENT_SHADER);

            const program = this.#gl.createProgram();

            this.#gl.attachShader(program, vertex);
            this.#gl.attachShader(program, fragment);
            this.#gl.linkProgram(program);

            const success = this.#gl.getProgramParameter(program, this.#gl.LINK_STATUS);

            if (!success) {
                  const log = this.#gl.getProgramInfoLog(program);

                  this.#gl.deleteProgram(program);

                  throw new Error(log);
            }

            return program;
      }

      /**
       * @param {string} name 
       */
      createBuffer(name) {
            return new Buffer(this.#gl, name, extractAttributeType(name, this.#source), this.#program);
      }

      createIndexBuffer() {
            return new IndexBuffer(this.#gl);
      }

      /**
       * @param {string} name 
       */
      createUniform(name) {
            return new UniformBuffer(this.#gl, name, this.#program, extractUniformType(name, this.#source));
      }

      /**
       * 
       * @param {number} count
       * @param {number} [mode=this.#gl.TRIANGLES] 
       */
      draw(count, indexed = false, mode = this.#gl.TRIANGLES) {
            this.#gl.useProgram(this.#program);
            if (indexed) {
                  this.#gl.drawElements(mode, 0, this.#gl.UNSIGNED_SHORT, count);
            } else {
                  this.#gl.drawArrays(mode, 0, count);
            }

      }
}