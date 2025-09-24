/**@import { Buffer } from "../lib/buffer/Buffer.js";*/
/**@import {BucketDescriptor} from "./Bucket.js";*/

import { toWebGLPrimitive } from "../entity/GPUEntity2D.js";
import { IndexBuffer } from "../lib/buffer/IndexBuffer.js";
import { Texture } from "../lib/buffer/Texture.js";
import Shader from "../lib/Shader.js";
import { Camera } from "./Camera.js";
/**@import { Primitive } from "../entity/GPUEntity2D.js";*/

/**
 * @template T
 * @template K
 * @typedef {[T,K]} Couple
 */
/**
 * @template T
 * @template {string} Attr
 * @template {string} Text
 * @abstract
 */
export class Bucket {
      /**
       * @readonly
       * @type {Set<T>}
       */
      #bucket = new Set();
      /**
       * @readonly
       * @type {Shader}
       */
      #shader;
      /**
       * @type {Couple<Attr,Buffer>[]}
       * @readonly
       */
      #attributes = [];
      /**
       * @type {Couple<Text,Texture>[]}
       * @readonly
       */
      #textures = [];
      /**
       * @type {IndexBuffer}
       * @readonly
       */
      #indices;

      get entities() {
            return [...this.#bucket];
      }

      get gl() {
            return this.#shader.gl;
      }

      get shader() {
            return this.#shader;
      }
      
      /**
       * @param {WebGLRenderingContext} gl 
       * @param {BucketDescriptor<Attr,Text>} descriptor 
       */
      constructor(gl, descriptor) {
            this.#shader = new Shader(gl, descriptor.vertex, descriptor.fragment);
            
            this.#initializeParallelCouple(
                  this.#attributes,
                  descriptor.attributes,
                  attr => this.#shader.createBuffer(attr)
            );
            this.#initializeParallelCouple(
                  this.#textures,
                  descriptor.textures,
                  texture => this.#shader.createTexture(texture)
            );

            this.#indices = this.#shader.createIndexBuffer();
      }

      /**
       * @template T
       * @template X
       * @template {string} K
       * @param {Couple<K,T>[]} couple 
       * @param {Record<K,X>} source 
       * @param {(source: X) => T} mapper 
       */
      #initializeParallelCouple(couple, source, mapper) {
            const keys = Object.keys(source);

            for (let i = 0; i < keys.length; i++) {
                  const first = /**@type {K}*/(keys[i]);
                  const second = mapper(source[/**@type {K}*/(keys[i])]);
                  couple.push([first, second]);
            }
      }

      /**
       * write the needed buffers using data passed as argument
       * @param {number[][]} source
       */
      #writeAttributeBuffers(source) {
            for (let i = 0; i < this.#attributes.length; i++) {
                  const buffer = this.#attributes[i][1];
                  buffer.write(source[i]);
            }
      }
      /**
       * write the needed textures using data passed as argument
       * @param {string[]} source
       */
      #writeTextures(source) {
            for (let i = 0; i < this.#textures.length; i++) {
                  const texture = this.#textures[i][1];
                  texture.write(source[i]);
            }
      }
      /**
       * bind all buffers of the bucket.
       */
      #bindAttributeBuffers() {
            for (let i = 0; i < this.#attributes.length; i++) {
                  const buffer = this.#attributes[i][1];
                  buffer.bind();
            }
      }
      /**
       * add an entity that can be drawn to the bucket.
       * entity in the bucket are drawn when the 
       * {@link draw()} method is called
       * @param {T} shape 
       */
      add(shape) {
            this.#bucket.add(shape);
      }
      /**
       * remove an entity from the bucket.
       * this actions is used to stop drawing 
       * a particular entity
       * @param {T} shape 
       */
      remove(shape) {
            this.#bucket.delete(shape);
      }
      removeAll() {
            this.#bucket.clear();
      }

      draw() {

            if (this.#bucket.size <= 0) {
                  return this;
            }
            this.#shader.bind();
            this.#bindAttributeBuffers();

            const shapes = [...this.#bucket].sort(this.sorter);
            const drawPoints = this.getDrawPoints(shapes);
            const attributes = this.#attributes.map(_ => /**@type {number[]}*/([]));
            /**@type {string[]} */
            const textures = new Array(this.#textures.length);

            /**@type {number[]} */
            let indices = [];
            let offset = 0;
            let drawPoint = 0;

            for (let i = 0; i < shapes.length; i++) {
                  //check if need to draw
                  if (i > 0 && drawPoints[drawPoint] === shapes[i]) {
                        // perform draw
                        this.#writeAttributeBuffers(attributes);
                        this.#writeTextures(textures);
                        this.#indices.write(indices);
                        
                        this
                              .#shader
                              .drawIndexed(
                                    indices.length, 
                                    toWebGLPrimitive(
                                          this.toPrimitive(shapes[i-1]), 
                                          this.shader.gl
                                    )
                              );

                        // reset
                        for (let j = 0; j < this.#attributes.length; j++) {
                              attributes[j] = [];
                        }

                        indices = [];
                        offset = 0;

                        drawPoint++;
                  }
                  // setting attributes
                  const attribValues = this.toAttributeBuffers(shapes[i]);

                  for (let j = 0; j < this.#attributes.length; j++) {
                        const key = this.#attributes[j][0];
                        const attrib = attribValues[key] || [];

                        attributes[j] = attributes[j].concat(attrib);
                  }

                  const textureValues = this.toTextures(shapes[i]);


                  for (let j = 0; j < this.#textures.length; j++) {
                        const key = this.#textures[j][0];
                        const texture = textureValues[key] || '';

                        textures[j] = texture;
                  }
                  // setting index buffer
                  const ind = this.toIndicesBuffer(shapes[i]);
                  // if max of indices isn't equal to vertex count 
                  // (a.k.a exists at least one vertex that is not used)
                  // algorithm will fail
                  let max = -1;

                  for (let i = (ind.length - 1); i > 0; i--) {
                        if (max < ind[i]) {
                              max = ind[i];
                        }
                  }

                  max++;

                  indices = indices.concat(ind.map(i => i + offset));
                  offset += max;
            }

            this.#writeAttributeBuffers(attributes);
            this.#writeTextures(textures);
            this.#indices.write(indices);
            this.#shader.drawIndexed(indices.length);
      }

      /**
       * function used to sort shapes
       * before drawing them
       * @abstract
       * @param {T} _
       * @param {T} __ 
       * @returns {-1|0|1}
       */
      sorter(_, __) {
            throw new Error("sorter method must be implemented into Buckets")
      }

      /**
       * function used to create buffers
       * used to draw the shape
       * @abstract
       * @param {T}_
       * @returns {Record<Attr,number[]>}
       */
      toAttributeBuffers(_) {
            throw new Error("toAttributeBuffers method must be implemented into Buckets")
      }

      /**
       * function used to generate indices buffer
       * @abstract
       * @param {T}_
       * @returns {number[]}
       */
      toIndicesBuffer(_) {
            throw new Error("toIndicesBuffer method must be implemented into Buckets")
      }

       /**
       * function used to generate indices buffer
       * @abstract
       * @param {T}_
       * @returns {Record<Text,string>}
       */
      toTextures(_) {
            throw new Error("toTextures method must be implemented into Buckets")
      }

      /**
       * function used to determine when 
       * should be performed a draw action.
       * every time a shape contained inside the returned array 
       * is encountered, the draw is performed 
       * (excluding the shape used as breakpoint). 
       * 
       * ---
       * 
       * ### implementation detail
       * . entities used as breakpoint will be drawn
       * in the successive cycle of draw.
       * 
       * . draw-points should be ordered as in the list passed as argument
       * 
       * > #### example
       * > param: [a,b,c,d,e] 
       * 
       * > draw-points: [b,a] ❌
       * 
       * > draw-points: [a,b] ✅
       *
       * @abstract
       * @param {T[]} _
       * @returns {T[]}
       */
      getDrawPoints(_) {
            throw new Error("getDrawPoints method must be implemented into Buckets")
      }

      /**
       * @abstract
       * @param {T} _
       * @return {Primitive}
      */
      toPrimitive(_) {
            throw new Error("toPrimitive method must be implemented into Buckets")
      }

      /**
       * bind the camera to this bucket.
       * this passage is needed to render correctly 
       * the texture
       * @param {Camera} _ 
       */
      bindCamera(_) {}
}