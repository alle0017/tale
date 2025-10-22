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
                        row.push(Image.map.get(asset[i][j])?.color);
                  }
                  this.#matrix.push(row);
            }
      }
      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            const PIXEL_COMPONENTS = 2;

            for (let i = 0; i < this.#matrix.length; i++) {
                  for (let j = 0; j < this.#matrix[i].length; j++) {
                        for (let k = 0; k < PIXEL_COMPONENTS; k++) {
                              if (!this.#matrix[i][j]) {
                                    continue;
                              }
                              screen.set({
                                    x: j * PIXEL_COMPONENTS + k + this.x,
                                    y: i + this.y,
                                    z: this.z,
                                    color: '#000',
                                    background: this.#matrix[i][j],
                                    char: ' ',
                              });
                        }
                  }
            }
      }
}
