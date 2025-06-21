/**@import {Buffer} from "./buffer/Buffer";*/
/**@import {IndexBuffer} from "./buffer/IndexBuffer";*/

import Shader from "./Shader.js";

export default class Shape {

      /**
       * @type {Shader}
       */
      static #shader;

      /**
       * 
       * @param {WebGLRenderingContext} gl 
       */
      static #createShader(gl) {
            if (!Shape.#shader) {
                  Shape.#shader = new Shader(
                        gl, 
                        /*glsl*/`
                        attribute vec2 a_pos;
                        attribute vec4 a_color;

                        uniform mat2 u_transformation;


                        varying vec4 v_color;

                        void main() {
                              gl_Position = u_transformation * a_pos;
                              v_color = a_color;
                        }
                        `,
                        /*glsl*/`
                        precision mediump float;
                        varying vec4 v_color;

                        void main() {
                              if (gl_FragColor.a <= 0.01) {
                                    discard;
                              }
                        }
                        `
                  );
            }

            return Shape.#shader;
      }

      /**
       * @type {Buffer}
       * @readonly
       */
      #colorBuffer;
      /**
       * @type {IndexBuffer}
       * @readonly
       */
      #indexBuffer;
      /**
       * @type {Buffer}
       * @readonly
       */
      #positionBuffer;
      /**
       * @type {number}
       * @readonly
       */
      #count;
      /**
       * @type {number}
       * @readonly
       */
      #primitive;


      /**
       * @param {WebGLRenderingContext} gl
       * @param {number[]} path 
       * @param {GLenum} [primitive]
       */
      constructor(gl, path, primitive = gl.TRIANGLES) {
            const shader = Shape.#createShader(gl);     
            
            this.#positionBuffer = shader.createBuffer('a_pos');
            this.#colorBuffer = shader.createBuffer('a_color');
            
            this.#indexBuffer = shader.createIndexBuffer();

            this.#positionBuffer.write(path, gl.STATIC_DRAW);
            this.#count = path.length;

            switch (primitive) {
                  case gl.TRIANGLES: 
                        this.#indexBuffer.write(this.#triangulate(path))
                  break;
                  case gl.LINES: 
                        this.#indexBuffer.write(this.#wire(path));
                  break;
                  default: throw new Error('Primitive not recognized');
            }
      }

      /**
       * 
       * @param {number[]} points 
       */
      #triangulate(points) {
            const indices = [];

            for (let i = 0; i < points.length - 1; i++) {
                  indices.push(0);
                  indices.push(i);
                  indices.push(i + 1);
            }

            return indices;
      }

      /**
       * 
       * @param {number[]} points 
       */
      #wire(points) {
            const indices = [];

            for (let i = 0; i < points.length; i++) {
                  indices.push(i);
                  indices.push((i + 1)%points.length);
            }

            return indices;
      }

      draw() {
            this.#colorBuffer.bind();
            this.#positionBuffer.bind();
            this.#indexBuffer.bind()

            Shape.#shader.draw(this.#count, true, this.#primitive);
      }
}