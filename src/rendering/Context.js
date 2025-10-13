/**@import GPUEntity2D from "./entities/GPUEntity2D.js";*/
/**@import GPUContext from "./index.d.ts"*/

import OrderedList from "../types/OrderedList.js";
import Screen from "./screen/screen.js";

/**
 * Represents the rendering context for WebGL operations.
 * @implements {GPUContext}
 */
export default class Context {

     /* get camera() {
            return this.#camera;
      }*/
      /**
       * @type {Screen}
       */
      #ctx;
      /**
       * @type {OrderedList<GPUEntity2D>}
       */
      #entities = new OrderedList();
      get entities() {
            return [...this.#entities]
      }

      get canvas() {
            return this.#ctx.grid;
      }

      constructor() {
            this.#ctx = new Screen();
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

      draw() {
            this.#entities.forEach(e => e.draw());
            this.#ctx.draw();
      }

      clear() {
            this.#ctx.grid.clear();
      }
      removeAll() {
            this.#entities.clear();
      }
      /**
       * 
       * @param {GPUEntity2D} entity 
       */
      addEntity(entity) {
            entity.$setScreen(this.#ctx);
            this.#entities.push(entity);
      }
      /**
       * 
       * @param {GPUEntity2D} entity 
       */
      removeEntity(entity) {
            this.#entities.delete(entity);
      }
}