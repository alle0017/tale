import TextureEntity from "../entity/Texture.js";
import { Bucket } from "./Bucket.js";
import { Camera } from "./Camera.js";

/**
 * @extends {Bucket<TextureEntity, 'positions' | 'textureCoords' | 'transformation' | 'light', never>}
 */
export default class TextureBucket extends Bucket {
      /**
       * 
       * @param {WebGLRenderingContext} gl 
       */
      constructor(gl) {
            super(gl, {
                  textures: {
                        image: 'u_texture',
                  },
                  attributes: {
                        positions: 'a_pos',
                        textureCoords: 'a_text_coords',
                        transformation: 'a_transform',
                        light: 'a_light',
                  },
                  fragment: /*glsl*/`
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
                  `,
                  vertex: /*glsl*/`
                  attribute vec3 a_pos;
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
                              a_pos.z
                        );
                        gl_Position = vec4(u_camera * pos, 1.);
                  }
                  `
            });
      }
      /**
       * bind the camera to this bucket.
       * this passage is needed to render correctly 
       * the texture
       * @param {Camera} camera 
       */
      bindCamera(camera) {
            this.shader.bind();
            camera.bind(this.shader.program, 'u_camera');
      }
      /**
       * 
       * @param {TextureEntity} a 
       * @param {TextureEntity} b 
       * @returns {number}
       */
      sorter(a, b) {
            return a.image.localeCompare(b.image);
      }
      /**
       * 
       * @param {TextureEntity} textureEntity 
       */
      toAttributeBuffers(textureEntity) {
            const count = textureEntity.vertices.length;
            const sin = Math.sin(textureEntity.rotation);
            const cos = Math.cos(textureEntity.rotation);
            const transf = [
                  textureEntity.scaleX * (sin + cos), 
                  textureEntity.scaleY * (-sin + cos), 
                  textureEntity.x/this.gl.canvas.width, 
                  textureEntity.y/this.gl.canvas.height
            ];
            const transformation = [];

            for (let j = 0; j < count; j++) {
                  transformation.push(...transf);
            }

            return {
                  transformation,
                  light: new Array(count).fill(textureEntity.light, 0, count),
                  positions: textureEntity.vertices,
                  textureCoords: textureEntity.textureCoords,
            }
      }
      /**
       * 
       * @param {TextureEntity} textureEntity 
       * @returns 
       */
      toIndicesBuffer(textureEntity) {
            return textureEntity.indices;
      }
      /**
       * @param {TextureEntity} texture 
       * @returns 
       */
      toTextures(texture) {
            return {
                  image: texture.image,
            };
      }
      /**
       * 
       * @param {TextureEntity[]} textures
       * @returns 
       */
      getDrawPoints(textures) {
            return textures.filter((texture,i) => i > 0 && texture.image !== textures[i-1].image);
      }
      /**
       * 
       * @param {TextureEntity} shape 
       * @returns 
       */
      toPrimitive(shape) {
            return shape.primitive;
      }
}