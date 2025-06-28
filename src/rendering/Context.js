import ShapeBucket from "./shader/buckets/ShapeBucket.js";
import TextureBucket from "./shader/buckets/TextureBucket.js";
import Shape from "./shader/Shape.js";
import TextureEntity from "./shader/Texture.js";

/**
 * Represents the rendering context for WebGL operations.
 */
export default class Context {
      /**
       * @type {WebGLRenderingContext}
       */
      #ctx;

      /**
       * @type {TextureBucket}
       * @readonly
       */
      #textures;

      /**
       * @type {ShapeBucket}
       * @readonly
       */
      #shapes;

      /**
       * Initializes the WebGL context and associated buckets.
       */
      constructor() {
            const cvs = document.createElement('canvas');

            document.body.appendChild(cvs);

            this.#ctx = cvs.getContext('webgl');
            this.#textures =  new TextureBucket(this.#ctx);
            this.#shapes = new ShapeBucket(this.#ctx);
      }

      /**
       * Draws all textures and shapes in their respective buckets.
       */
      draw() {
            this.#textures.draw();
            this.#shapes.draw();
      }

      /**
       * Clears the WebGL context with a black background.
       */
      clear() {
            this.#ctx.clearColor(0,0,0,1);
            this.#ctx.clear(this.#ctx.DEPTH_BUFFER_BIT | this.#ctx.COLOR_BUFFER_BIT);
      }

      /**
       * Creates a rectangle shape.
       * @returns {Shape} A new rectangle shape.
       */
      rect() {
            return new Shape([
                  1,0,
                  0,1,
                  0,0,
                  1,1
            ]);
      }

      /**
       * Creates a new texture entity.
       * @returns {TextureEntity} A new texture entity.
       */
      image() {
            return new TextureEntity();
      }

      /**
       * Adds a texture entity to the texture bucket for rendering.
       * @param {TextureEntity} img - The texture entity to add.
       */
      drawImage(img) {
            this.#textures.add(img);
      }

      /**
       * Removes a texture entity from the texture bucket.
       * @param {TextureEntity} img - The texture entity to remove.
       */
      clearImage(img) {
            this.#textures.remove(img);
      }

      /**
       * Adds a shape to the shape bucket for rendering.
       * @param {Shape} shape - The shape to add.
       */
      drawShape(shape) {
            this.#shapes.add(shape);
      }

      /**
       * Removes a shape from the shape bucket.
       * @param {Shape} shape - The shape to remove.
       */
      clearShape(shape) {
            this.#shapes.remove(shape);
      }
}