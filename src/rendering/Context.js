import OrderedList from "../types/OrderedList.js";
import Screen from "./screen/screen.js";
/**@import {Shader} from "./shaders/shader.js";*/
/**@import GPUContext from "./index.d.ts"*/

/**
 * Represents the rendering context for WebGL operations.
 * @implements {GPUContext}
 */
export default class Context {

      /**
       * @type {OrderedList<Shader>}
       */
      #entities = new OrderedList();
      /**
       * @type {Screen}
       */
      #screen;

      get entities() {
            return [...this.#entities]
      }

      get canvas() {
            return this.#screen.grid;
      }

      get renderingPipeline() {
            return this.#screen.pipe;
      }

      constructor() {
            this.#screen = new Screen();
      }

      /**
       * Draws all textures and shapes in their respective buckets.
       */
      draw() {
            this.#entities.forEach(entity => entity.draw(this.#screen));
            this.#screen.draw();
      }

      clear() {
            this.#screen.grid.clear();
      }
      removeAll() {
            this.#entities.clear();
      }
      /**
       * 
       * @param {Shader} shader 
       */
      addEntity(shader) {
            this.#entities.push(shader);
      }
      /**
       * 
       * @param {Shader} shader 
       */
      removeEntity(shader) {
            this.#entities.delete(shader);
      }
}