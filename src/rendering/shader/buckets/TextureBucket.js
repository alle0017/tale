/**@import { Buffer } from "../lib/buffer/Buffer.js";*/
/**@import TextureEntity from "../entity/Texture.js";*/
import { IndexBuffer } from "../lib/buffer/IndexBuffer.js";
import { Texture } from "../lib/buffer/Texture.js";
import Shader from "../lib/Shader.js";
import { Camera } from "./Camera.js";

export default class TextureBucket {
      static #VERTICES_POS = [
            -1, -1,
            -1, 1,
            1, 1,
            1, -1,
      ];
      /**
       * @readonly
       * @type {Set<TextureEntity>}
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
      #texCoords
      /**
       * @type {Texture}
       * @readonly
       */
      #texture;
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
      get entities() {
            return [...this.#bucket];
      }
      /**
       * @param {WebGLRenderingContext} gl 
       */
      constructor(gl) {
            this.#shader = new Shader(
                  gl, 
                  /*glsl*/`
                  attribute vec2 a_pos;
                  attribute vec4 a_transform;
                  attribute float a_light;
                  attribute vec2 a_text_coords;

                  uniform mat3 u_camera;

                  varying vec2 v_text_coords;
                  varying float v_light;

                  void main() {
                        v_text_coords = a_text_coords;
                        v_light = a_light;
                        vec3 pos = vec3(
                              a_pos.x * a_transform.x + a_transform.z, 
                              a_pos.y * a_transform.y + a_transform.w, 
                              0.
                        );
                        gl_Position = vec4(u_camera * pos, 1.);
                  }
                  `,
                  /*glsl*/`
                  precision mediump float;
                  varying vec2 v_text_coords;
                  varying float v_light;

                  uniform sampler2D u_texture;

                  void main() {
                        vec4 color = vec4(
                              clamp(
                                    texture2D(u_texture, v_text_coords)*v_light, 
                                    0., 
                                    1.
                              )
                        );

                        if (color.a <= 0.01) {
                              discard;
                        }
                        gl_FragColor = color;
                  }
                  `
            );

            this.#positions = this.#shader.createBuffer('a_pos');
            this.#texCoords = this.#shader.createBuffer("a_text_coords");
            this.#transformation = this.#shader.createBuffer('a_transform');
            this.#light = this.#shader.createBuffer('a_light');
            this.#texture = this.#shader.createTexture('u_texture');
            this.#indices = this.#shader.createIndexBuffer();
      }
      /**
       * @param {number[]} positions 
       * @param {number[]} texCoords 
       * @param {number[]} transformations 
       * @param {number[]} lights 
       * @param {number[]} indices 
       */
      #draw(positions, texCoords, transformations, lights, indices) {
            this.#positions.write(positions);
            this.#transformation.write(transformations);
            this.#light.write(lights);
            this.#indices.write(indices);
            this.#texCoords.write(texCoords);

            this.#shader.drawIndexed(
                  indices.length,
                  this.#shader.gl.TRIANGLES
            );
      }
      /**
       * @param {TextureEntity} texture
       */
      add(texture) {
            this.#bucket.add(texture);
      }

      /**
       * @param {TextureEntity} texture 
       */
      remove(texture) {
            this.#bucket.delete(texture);
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

      draw() {
            if (this.#bucket.size <= 0) {
                  return this;
            }
            const count = 4;

            /**@type {number[]} */
            let transformations = [];
            /**@type {number[]} */
            let lights = [];
            /**@type {number[]} */
            let indices = [];
            /**@type {number[]} */
            let texCoords = [];
            /**@type {number[]} */
            let pos = [];

            const shapes = [...this.#bucket].sort((a,b) => a.image.localeCompare(b.image));
            let offset = 0;

            this.#texture.write(shapes[0].image);
            this.#texture.bind();
            this.#positions.bind();
            this.#texCoords.bind();
            this.#transformation.bind();
            this.#light.bind();
            this.#indices.bind();

            for (let i = 0; i < shapes.length; i++) {
                  if (this.#texture.image !== shapes[i].image) {
                        this.#draw(pos, texCoords, transformations, lights, indices);
                        transformations = [];
                        lights = [];
                        indices = [];
                        texCoords = [];
                        this.#texture.write(shapes[i].image);
                  }

                  const sin = Math.sin(shapes[i].rotation);
                  const cos = Math.cos(shapes[i].rotation);
                  const transf = [
                        shapes[i].scaleX * (sin + cos), 
                        shapes[i].scaleY * (-sin + cos), 
                        shapes[i].x/this.#shader.gl.canvas.width, 
                        shapes[i].y/this.#shader.gl.canvas.height
                  ];

                  indices = indices.concat(shapes[i].indices.map(i => i + offset));
                  lights = lights.concat(new Array(count).fill(shapes[i].light, 0, count));
                  texCoords = texCoords.concat(shapes[i].textureCoords);
                  pos = pos.concat(TextureBucket.#VERTICES_POS);

                  for (let j = 0; j < count; j++) {
                        transformations.push(...transf);
                  }
                  offset += count;
            }
            this.#draw(pos, texCoords, transformations, lights, indices);
      }
      removeAll() {
            this.#bucket.clear();
      }
}