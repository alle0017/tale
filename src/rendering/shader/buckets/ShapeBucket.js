import Shape from "../entity/Shape.js";
import { Bucket } from "./Bucket.js";

/**
 * @extends {Bucket<Shape, 'positions' | 'colors' | 'transformation' | 'light', never>}
 */
export default class ShapeBucket extends Bucket {
      /**
       * 
       * @param {WebGLRenderingContext} gl 
       */
      constructor(gl) {
            super(gl, {
                  textures: {},
                  attributes: {
                        positions: 'a_pos',
                        colors: 'a_color',
                        transformation: 'a_transform',
                        light: 'a_light',
                  },
                  fragment: /*glsl*/`
                  precision mediump float;
                  varying vec4 v_color;

                  void main() {
                        if (v_color.a <= 0.01) {
                              discard;
                        }
                        gl_FragColor = v_color;
                  }
                  `,
                  vertex: /*glsl*/`
                  attribute vec3 a_pos;
                  attribute vec4 a_color;
                  attribute vec4 a_transform;
                  attribute float a_light;

                  uniform mat3 u_camera;

                  varying vec4 v_color;

                  void main() {
                        gl_Position = vec4(
                              u_camera
                              *
                              vec3(
                                    a_pos.x * a_transform.x + a_transform.z, 
                                    a_pos.y * a_transform.y + a_transform.w, 
                                    a_pos.z
                              )
                        ,1);
                        v_color = vec4(clamp(a_color*a_light, 0., 1.));
                  }
                  `
            });
      }
      /**
       * 
       * @param {Shape} a 
       * @param {Shape} b 
       * @returns {number}
       */
      sorter(a, b) {
            return a.primitive - b.primitive;
      }
      /**
       * 
       * @param {Shape} shape 
       */
      toAttributeBuffers(shape) {
            const count = shape.coords.length;
            const sin = Math.sin(shape.rotation);
            const cos = Math.cos(shape.rotation);
            const transf = [
                  shape.scaleX * (sin + cos), 
                  shape.scaleY * (-sin + cos), 
                  shape.x/this.gl.canvas.width, 
                  shape.y/this.gl.canvas.height
            ];
            const transformation = [];

            for (let j = 0; j < count; j++) {
                  transformation.push(...transf);
            }

            return {
                  transformation,
                  light: new Array(count).fill(shape.light, 0, count),
                  positions: shape.coords,
                  colors: shape.colors,
            }
      }
      /**
       * 
       * @param {Shape} shape 
       * @returns 
       */
      toIndicesBuffer(shape) {
            return shape.indices;
      }
      toTextures() {
            return {};
      }
      /**
       * 
       * @param {Shape[]} shapes 
       * @returns 
       */
      getDrawPoints(shapes) {
            return shapes.filter((shape,i) => i > 0 && shape.primitive !== shapes[i-1].primitive);
      }

      /**
       * 
       * @param {Shape} shape 
       * @returns 
       */
      toPrimitive(shape) {
            return shape.primitive;
      }
}