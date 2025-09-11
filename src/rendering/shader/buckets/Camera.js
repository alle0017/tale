import List from "../../../types/List.js";
import { SharedUniformBuffer } from "../lib/buffer/SharedUniformBuffer.js";
/**@import {Position} from "../../../lib/index.js" */
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
       * @type {List<WebGLProgram>}
       */
      #marked = new List();
      #data = [1,0,0,0];

      get focus() {
            return this.#data[0];
      }
      set focus(value) {
            this.#setData(0,value);
      }
      get x() {
            return this.#data[1];
      }
      set x(value) {
            this.#setData(1,value);
      }
      get y() {
            return this.#data[2];
      }
      set y(value) {
            this.#setData(2,value);
      }
      get rotation() {
            return this.#data[3];
      }
      set rotation(value) {
            this.#setData(2,value);
      }

      /**
       * @param {WebGLRenderingContext} gl 
       */
      constructor(gl) {
            this.#gl = gl;
            this.#buffer = new SharedUniformBuffer(this.#gl, 'mat3');
            this.#buffer.write([
                  1, 0, 0,
                  0, 1, 0, 
                  0, 0, 1
            ]);
      }

      /**
       * method used to set the data and 
       * schedule a rewrite of the camera
       * @param {number} idx 
       * @param {number} value 
       */
      #setData(idx, value) {
            if (this.#data[idx] === value) {
                  return;
            }
            this.#marked.clear();
            this.#data[idx] = value;
      }

      /**
       * converts raw data into 3x3 inverse of transformation matrix
       * associated with the camera, following this image 
       * {@link https://semath.info/src/inverse-cofactor-ex3.html}
       * @returns {number[]}
       */
      #toMatrix() {
            const cos = Math.cos(this.rotation);
            const sin = Math.sin(this.rotation);
            const x = this.x/this.#gl.canvas.width;
            const y = this.y/this.#gl.canvas.height;
            const s = this.focus;

            const a11 = s*cos;
            const a12 = s*-sin;
            const a13 = x;

            const a21 = s*sin;
            const a22 = s*cos;
            const a23 = y;

            const dt = 1/(a11*a22 - a12*a21);

            return [
                  a22,        -a12,       (a12*a23 - a13*a22),
                  -a21,       a11,        -(a11*a23 - a13*a21),
                  0,          0,          a11*a22 - a12*a21
            ].map(v => v * dt);
      }

      /**
       * bind the camera to the specified program.
       * @param {WebGLProgram} program - program to bound
       * @param {string} name - name of the uniform used inside the program
       * to represent the camera
       */
      bind(program, name) {
            if (!this.#marked.has(program)) {
                  this.#buffer.write(this.#toMatrix());
                  this.#marked.push(program);
            }
            this.#buffer.bind(program, name);
      }

      /**
       * follow a position onto the screen
       * @param {Position} position 
       */
      follow(position) {
            position.onMove(pos => {
                  this.x = pos.x;
                  this.y = pos.y;
            });
      }
}