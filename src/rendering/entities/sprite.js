import PixelResolver from "../image/pixel-resolver.js";
import GPUEntity2D from "./GPUEntity2D.js";

export default class Sprite extends GPUEntity2D {
      /**
       * @type {import("../pipe/pipe.js").Pixel[][]}
       */
      #matrix;
      /**
       * 
       * @param {TemplateStringsArray} template 
       */
      constructor(template) {
            super();
            this.#matrix = PixelResolver.get().image(template);
      }

      draw() {
            if (!this.screen) {
                  return;
            }
            for (let i = 0; i < this.#matrix.length; i++) {
                  for (let j = 0; j < this.#matrix[i].length; j++) {
                        this.screen.set({
                              ...this.#matrix[i][j],
                              x: this.#matrix[i][j].x + this.x,
                              y: this.#matrix[i][j].y + this.y,
                              z: this.#matrix[i][j].z + this.zIndex,
                        });
                  }
            }
      }      
}