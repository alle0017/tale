/**@import Screen from "../screen/screen.js";*/
import { Shader } from "./shader.js";
/**
 * @typedef {{ 
 * color: import("../rendering/grid.js").HexColor,
 * }} VirtualPixel
 */
/**
 * @implements {Shader}
 */
export class Image extends Shader {
      /**
       * @type {Map<number, VirtualPixel>}
       */
      static map = new Map();
      /**
       * @type {import("../pipe/pipe.js").Pixel[]}
       */
      #matrix;
      x = 0;
      y = 0;
      z = 0;
      /**
       * 
       * @param {number[][]} asset 
       */
      constructor(asset) {
            super();

            this.#matrix = [];

            for (let i = 0; i < asset.length; i++) {
                  for (let j = 0; j < asset[i].length; j++) {
                        this.#matrix.push({
                              x: j,
                              y: i,
                              z: 0,
                              color: Image.map.get(asset[i][j])?.color || '#FFF',
                        });
                  }
            }
      }
      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            for (let i = 0; i < this.#matrix.length; i++) {
                  screen.set({
                        x: this.#matrix[i].x + this.x,
                        y: this.#matrix[i].y + this.y,
                        z: this.#matrix[i].z + this.z,
                        color: this.#matrix[i].color,
                  });
            }
      }
}
