/**@import { Buffer } from "../lib/buffer/Buffer.js";*/
/**@import Shape from "../entity/Shape.js";*/
import { IndexBuffer } from "../lib/buffer/IndexBuffer.js";
import Shader from "../lib/Shader.js";
import { Camera } from "./Camera.js";

export default class ShapeBucket {
      /**
       * @readonly
       * @type {Set<Shape>}
       */
      #bucket = new Set();
      /**
       * @readonly
       * @type {Shader}
       */
      #shader;
      /**
       * @type {Buffer}
       * @readonly
       */
      #positions;
      /**
       * @type {Buffer}
       * @readonly
       */
      #colors;
      /**
       * @type {Buffer}
       * @readonly
       */
      #transformation;
      /**
       * @type {Buffer}
       * @readonly
       */
      #light;
      /**
       * @type {IndexBuffer}
       * @readonly
       */
      #indices;
      /**
       * @param {WebGLRenderingContext} gl 
       */
      constructor(gl) {
            this.#shader = new Shader(
                  gl, 
                  /*glsl*/`
                  attribute vec2 a_pos;
                  attribute vec4 a_color;
                  attribute vec4 a_transform;
                  attribute float a_light;

                  uniform mat3 u_camera;

                  varying vec4 v_color;

                  void main() {
                        gl_Position = vec4(u_camera*vec3(a_pos.x * a_transform.x + a_transform.z, a_pos.y * a_transform.y + a_transform.w, 0),1);
                        v_color = vec4(clamp(a_color*a_light, 0., 1.));
                  }
                  `,
                  /*glsl*/`
                  precision mediump float;
                  varying vec4 v_color;

                  void main() {
                        if (v_color.a <= 0.01) {
                              discard;
                        }
                        gl_FragColor = v_color;
                  }
                  `
            );

            this.#positions = this.#shader.createBuffer('a_pos');
            this.#colors = this.#shader.createBuffer('a_color');
            this.#transformation = this.#shader.createBuffer('a_transform');
            this.#light = this.#shader.createBuffer('a_light');
            this.#indices = this.#shader.createIndexBuffer();
      }

      /**
       * bind the camera to this bucket.
       * this passage is needed to render correctly 
       * the texture
       * @param {Camera} camera 
       */
      bindCamera(camera) {
            this.#shader.bind();
            camera.bind(this.#shader.program, 'u_camera');
      }

      /**
       * 
       * @param {1|2|3} vertices 
       */
      #toPrimitive(vertices) {
            switch (vertices) {
                  case 1: return this.#shader.gl.POINTS;
                  case 2: return this.#shader.gl.LINES;
                  case 3: return this.#shader.gl.TRIANGLES;
            }
      }
      /**
       * @param {Shape} shape 
       */
      add(shape) {
            this.#bucket.add(shape);
      }

      /**
       * @param {Shape} shape 
       */
      remove(shape) {
            this.#bucket.delete(shape);
      }

      draw() {

            if (this.#bucket.size <= 0) {
                  return this;
            }

            /**@type {number[]} */
            let vertices = [];
            /**@type {number[]} */
            let colors = [];
            /**@type {number[]} */
            let transformations = [];
            /**@type {number[]} */
            let lights = [];
            /**@type {number[]} */
            let indices = [];

            const shapes = [...this.#bucket].sort((a,b) => a.primitive - b.primitive);
            let primitive = shapes[0].primitive;
            let offset = 0;

            this.#shader.bind();

            this.#positions.bind();
            this.#colors.bind();
            this.#transformation.bind();
            this.#light.bind();
            this.#indices.bind();

            for (let i = 0; i < shapes.length; i++) {
                  if (primitive !== shapes[i].primitive) {
                        this.#positions.write(vertices);
                        this.#colors.write(colors);
                        this.#transformation.write(transformations);
                        this.#light.write(lights);
                        this.#indices.write(indices);

                        this.#shader.drawIndexed(
                              indices.length,
                              this.#toPrimitive(primitive)
                        );
                        primitive = shapes[i].primitive;
                        offset = 0;
                        vertices = [];
                        colors = [];
                        transformations = [];
                        lights = [];
                        indices = [];
                  }

                  const count = shapes[i].vertices.length;
                  const sin = Math.sin(shapes[i].rotation);
                  const cos = Math.cos(shapes[i].rotation);

                  const transf = [shapes[i].scaleX * (sin + cos), shapes[i].scaleY * (-sin + cos), shapes[i].x, shapes[i].y]

                  indices = indices.concat(shapes[i].indices.map(i => i + offset));
                  vertices = vertices.concat(shapes[i].vertices);
                  colors = colors.concat(shapes[i].colors);
                  lights = lights.concat(new Array(count).fill(shapes[i].light, 0, count));

                  for (let j = 0; j < count; j++) {
                        transformations.push(...transf);
                  }
                  offset += count;
            }

            this.#positions.write(vertices);
            this.#colors.write(colors);
            this.#transformation.write(transformations);
            this.#light.write(lights);
            this.#indices.write(indices);

            this.#shader.drawIndexed(
                  indices.length,
                  this.#toPrimitive(primitive)
            );
      }
}