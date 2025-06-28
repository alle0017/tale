import ShapeBucket from "./shader/buckets/ShapeBucket.js";
import TextureBucket from "./shader/buckets/TextureBucket.js";
import Shape from "./shader/Shape.js";
import TextureEntity from "./shader/Texture.js";

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

      constructor() {
            const cvs = document.createElement('canvas');

            document.body.appendChild(cvs);

            this.#ctx = cvs.getContext('webgl');
            this.#textures =  new TextureBucket(this.#ctx);
            this.#shapes = new ShapeBucket(this.#ctx);
            this.#draw();
      }

      #draw() {
            this.#ctx.clearColor(0,0,0,1);
            this.#ctx.clear(this.#ctx.DEPTH_BUFFER_BIT | this.#ctx.COLOR_BUFFER_BIT);
            this.#textures.draw();
            this.#shapes.draw();
            requestAnimationFrame(() => this.#draw());
      }

      rect() {
            return new Shape([
                  1,0,
                  0,1,
                  0,0,
                  1,1
            ]);
      }

      image() {
            return new TextureEntity();
      }

      /**
       * @param {TextureEntity} img
       */
      drawImage(img) {
            this.#textures.add(img);
      }

      /**
       * @param {TextureEntity} img
       */
      clearImage(img) {
            this.#textures.remove(img);
      }

      /**
       * @param {Shape} shape
       */
      drawShape(shape) {
            this.#shapes.add(shape);
      }

      /**
       * @param {Shape} shape
       */
      clearShape(shape) {
            this.#shapes.remove(shape);
      }
}