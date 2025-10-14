/**@import Screen from "../screen/screen.js";*/
import { Shader } from "./shader.js";
/**
 * @typedef {{ 
 * color: import("../rendering/canvas.js").HexColor,
 * }} VirtualPixel
 */
export const PIXEL = '▀';
/**
 * @implements {Shader}
 */
export class Image extends Shader {
      /**
       * @type {Map<number, VirtualPixel>}
       */
      static map = new Map();
      /**
       * @type {import("../rendering/canvas.js").HexColor[][]}
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
                  /**
                   * @type {import("../rendering/canvas.js").HexColor[]}
                   */
                  const row = [];
                  for (let j = 0; j < asset[i].length; j++) {
                        row.push(Image.map.get(asset[i][j])?.color || '#FFF');
                  }
                  this.#matrix.push(row);
            }
      }
      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            /**
             * @type {import("../rendering/canvas.js").HexColor[][]}
             */
            let matrix = [];

            if (this.y%2 !== 0) {
                  matrix.push(new Array(this.#matrix[0].length).fill('#000'));
            }

            matrix = matrix.concat(this.#matrix);

            for (let i = 0; i < matrix.length; i += 2) {
                  for (let j = 0; j < matrix[i].length; j++) {
                        screen.set({
                              x: j + this.x,
                              y: i/2 + this.y,
                              z: this.z,
                              color: matrix[i]?.[j] || '#000',
                              background: matrix[i + 1]?.[j] || '#000',
                              char: PIXEL,
                        });
                  }
            }
      }
}
