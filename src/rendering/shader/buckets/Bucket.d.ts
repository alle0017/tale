import Shader from "../lib/Shader";

type BucketDescriptor<Attr extends string, Text extends string> = {
      attributes: Record<Attr,string>;
      textures: Record<Text,string>;
      fragment: string;
      vertex: string;
}

export abstract class Bucket<T, Attr extends string, Text extends string> {
      readonly gl: WebGLRenderingContext;
      readonly shader: Shader;
      /**
       * @param {WebGLRenderingContext} gl 
       * @param {BucketDescriptor<{},Attr,Text>} descriptor 
       */
      constructor(gl: WebGLRenderingContext, descriptor: BucketDescriptor<Attr,Text>);
      /**
       * function used to sort shapes
       * before drawing them
       * @abstract
       * @param {T} a
       * @param {T} b  
       * @returns {-1|0|1}
       */
      abstract sorter(a: T, b: T): number;
      /**
       * function used to create buffers
       * used to draw the shape
       * @abstract
       * @param {T} shape
       * @returns {Record<Attr,number[]>}
       */
      abstract toAttributeBuffers(shape: T): Record<Attr,number[]>;
      /**
       * function used to generate indices buffer
       * @abstract
       * @param {T} shape
       * @returns {number[]}
       */
      abstract toIndicesBuffer(shape: T): number[];
      /**
       * function used to generate textures
       * @abstract
       * @param {T} shape
       * @returns {Record<Text,string>}
       */
      abstract toTextures(shape: T): Record<Text,string>;
      /**
       * function used to determine when 
       * should be performed a draw action.
       * every time a shape contained inside the returned array 
       * is encountered, the draw is performed 
       * (excluding the shape used as draw-point). 
       * 
       * ---
       * 
       * ### implementation detail
       * . entities used as draw-point will be drawn
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
       * @param {T[]} shapes
       * @returns {T[]}
       */
      abstract getDrawPoints(shapes: T[]): T[];
}