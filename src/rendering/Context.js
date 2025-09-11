import { Camera } from "./shader/buckets/Camera.js";
import ShapeBucket from "./shader/buckets/ShapeBucket.js";
import TextureBucket from "./shader/buckets/TextureBucket.js";
import Shape from "./shader/entity/Shape.js";
import TextureEntity from "./shader/entity/Texture.js";
/**@import GPUEntity2D from "./shader/entity/GPUEntity2D.js";*/
/**@import GPUContext from "./index.js"*/

/**
 * Represents the rendering context for WebGL operations.
 * @implements {GPUContext}
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
       * @type {Camera}
       */
      #camera;

      get camera() {
            return this.#camera;
      }

      get entities() {
            return /**@type {GPUEntity2D[]}*/(this.#textures.entities).concat(/**@type {GPUEntity2D[]}*/(this.#shapes.entities))
      }

      /**
       * Initializes the WebGL context and associated buckets.
       * @param {HTMLCanvasElement} cvs 
       */
      constructor(cvs) {
            cvs ||= document.createElement('canvas');

            if (!cvs.isConnected) {
                  document.body.appendChild(cvs);
            }

            this.#ctx = cvs.getContext('webgl');
            this.#ctx.enable(this.#ctx.DEPTH_TEST);
            
            this.#textures =  new TextureBucket(this.#ctx);
            this.#shapes = new ShapeBucket(this.#ctx);
            this.#camera = new Camera(this.#ctx);
            this.#resize();
      }
      /**
       * 
       * @param {HTMLElement} parent 
       */
      #getWidth(parent) {
            if (parent.clientWidth <= 400) {
                  return 400;
            }

            if (parent.clientWidth > (window.innerWidth - 10)) {
                  return window.innerWidth - 10;
            }

            return parent.clientWidth;
      }
      /**
       * 
       * @param {HTMLElement} parent 
       */
      #getHeight(parent) {
            return this.#getWidth(parent)*3/4;
      }
      #resize() {
            const cvs = this.#ctx.canvas;
            const parent = cvs instanceof HTMLCanvasElement && cvs.parentElement ? cvs.parentElement: document.body;

            cvs.width = this.#getWidth(parent);
            cvs.height = this.#getHeight(parent);
            this.#ctx.viewport(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);

            parent.addEventListener('resize', () => {
                  cvs.width = this.#getWidth(parent);
                  cvs.height = this.#getHeight(parent);
                  this.#ctx.viewport(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
            });
      }
      /**
       * 
       * @param {HTMLElement} element
       */
      moveRoot(element) {
            element.append(/**@type {HTMLCanvasElement}*/(this.#ctx.canvas));
      }

      /**
       * Draws all textures and shapes in their respective buckets.
       */
      draw() {
            this.#textures.bindCamera(this.#camera);
            this.#textures.draw();
            this.#shapes.bindCamera(this.#camera);
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
                  -1, -1,
                  -1, 1,
                  1, 1,
                  1, -1,
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

      removeAll() {
            this.#shapes.removeAll();
            this.#textures.removeAll();
      }
}