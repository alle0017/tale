/**@import { Buffer } from "../lib/buffer/Buffer.js";*/
/**@import TextureEntity from "../entity/Texture.js";*/
import { IndexBuffer } from "../lib/buffer/IndexBuffer.js";
import { Texture } from "../lib/buffer/Texture.js";
import Shader from "../lib/Shader.js";

export default class TextureBucket {
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

                  varying vec2 v_text_coords;
                  varying float v_light;

                  void main() {
                        v_text_coords = a_text_coords;
                        v_light = a_light;
                        gl_Position = vec4(
                              a_pos.x * a_transform.x + a_transform.z, 
                              a_pos.y * a_transform.y + a_transform.w, 
                              0., 
                              1.
                        );
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
            this.#positions.write([
                  -1, -1,
                  -1, 1,
                  1, 1,
                  1, -1,
            ]);
            this.#texCoords = this.#shader.createBuffer("a_text_coords");
            this.#transformation = this.#shader.createBuffer('a_transform');
            this.#light = this.#shader.createBuffer('a_light');
            this.#texture = this.#shader.createTexture('u_texture');
            this.#indices = this.#shader.createIndexBuffer();
      }
      /**
       * @param {number[]} texCoords 
       * @param {number[]} transformations 
       * @param {number[]} lights 
       * @param {number[]} indices 
       */
      #draw(texCoords, transformations, lights, indices) {
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

            const shapes = [...this.#bucket].sort((a,b) => a.image.localeCompare(b.image));
            let offset = 0;

            this.#texture.write(shapes[0].image);
            this.#shader.bind();
            this.#texture.bind();
            this.#positions.bind();
            this.#texCoords.bind();
            this.#transformation.bind();
            this.#light.bind();
            this.#indices.bind();

            for (let i = 0; i < shapes.length; i++) {
                  if (this.#texture.image !== shapes[i].image) {
                        this.#draw(texCoords, transformations, lights, indices);
                        offset = 0; 
                        transformations = [];
                        lights = [];
                        indices = [];
                        texCoords = [];
                        this.#texture.write(shapes[i].image);
                  }

                  const sin = Math.sin(shapes[i].rotation);
                  const cos = Math.cos(shapes[i].rotation);
                  const transf = [shapes[i].scaleX * (sin + cos), shapes[i].scaleY * (-sin + cos), shapes[i].x, shapes[i].y];

                  indices = indices.concat(shapes[i].indices.map(i => i + offset));
                  lights = lights.concat(new Array(count).fill(shapes[i].light, 0, count));
                  texCoords = texCoords.concat(shapes[i].textureCoords);

                  for (let j = 0; j < count; j++) {
                        transformations.push(...transf);
                  }
                  offset += count;
            }

            this.#draw(texCoords, transformations, lights, indices);
      }
}