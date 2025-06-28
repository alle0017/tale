import GPUEntity2D from "./GPUEntity2D.js";
import Image from "../lib/buffer/Image.js";
/**@import GPUContext from "../../index" */

export default class TextureEntity extends GPUEntity2D {
      /**
       * @type {string}
       */
      image;

      /**
       * @type {number[]}
       */
      #textureCoords = [
            0, 0,
            0, 1,
            1, 1,
            1, 0,
      ];
      
      get textureCoords() {
            return this.#textureCoords;
      }

      get indices() {
            return [
                  0, 1, 2,
                  0, 2, 3,
            ];
      }

      get startX() {
            const w = Image.get(this.image).width;

            return this.#textureCoords[0]*w;
      }

      set startX(value) {
            const w = Image.get(this.image).width;
            this.#textureCoords[0] = value/w;
            this.#textureCoords[2] = value/w;
      }

      get startY() {
            const h = Image.get(this.image).height;

            return this.#textureCoords[1] * h;
      }

      set startY(value) {
            const h = Image.get(this.image).height;

            this.#textureCoords[1] = value/h;
            this.#textureCoords[7] = value/h;
      }

      get endX() {
            const w = Image.get(this.image).width;

            return this.#textureCoords[4] * w;
      }

      set endX(value) {
            const w = Image.get(this.image).width;

            this.#textureCoords[4] = value/w;
            this.#textureCoords[6] = value/w;
      }

      get endY() {
            const h = Image.get(this.image).height;

            return this.#textureCoords[3] * h;
      }

      set endY(value) {
            const h = Image.get(this.image).height;

            this.#textureCoords[3] = value/h;
            this.#textureCoords[5] = value/h;
      }

      /**
       * draw this into the provided
       * context
       * @param {GPUContext} ctx 
       */
      draw(ctx) {
            ctx.drawImage(this);
      }

      /**
       * remove this from the provided
       * context
       * @param {GPUContext} ctx 
       */
      remove(ctx) {
            ctx.clearImage(this);
      }
}