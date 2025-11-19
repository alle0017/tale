import { Area } from "../area.js";
/**@import {HexColor} from "../../rendering/canvas.js" */
/**@import Screen from "../../screen/screen.js";*/

/**
 * @typedef {{
 *    color: HexColor,
 *    background: HexColor,
 *    char: string,
 * }} Cell
 */
export class Canvas extends Area {
      /**
       * @type {Cell[][]}
       */
      #matrix = [];
      get matrix() {
            return this.#matrix;
      }
      /**
       * 
       * @param {number} width 
       * @param {number} height 
       */
      resize(width, height) {
            for (let i = 0; i < this.#matrix.length; i++) {
                  this.#matrix[i].length = width;
            }
            while (this.#matrix.length < height) {
                  this.#matrix.push(new Array(width));
            }
            super.resize(width, height);
      }
      /**
       * 
       * @param {number} x 
       * @param {number} y 
       * @param {string} char 
       * @param {HexColor} color 
       * @param {HexColor} background 
       */
      setChar(x, y, char, color = '#FFF', background = '#000') {
            this.#matrix[y][x] = {
                  char,
                  color,
                  background
            };
      }
      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            const height = this.height && this.height < this.#matrix.length? this.height: this.#matrix.length;
            
            for (let i = 0; i < height; i ++) {
                  const width = this.width && this.width < this.#matrix[i].length? this.width: this.#matrix[i].length;
                  for (let j = 0; j < width; j++) {

                        if (!this.#matrix[i][j]) {
                              continue;
                        }

                        screen.set({
                              x: j + this.x + this.offsetX,
                              y: i + this.y + this.offsetY,
                              z: this.z,
                              color: this.#matrix[i][j].color,
                              background: this.#matrix[i][j].background,
                              char: this.#matrix[i][j].char,
                        });
                  }
            }
      }
}