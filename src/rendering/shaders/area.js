/**@import Screen from "../screen/screen.js";*/
/**@import {HexColor} from "../rendering/canvas.js" */
import { Shader } from "./shader.js";
/**
 * @typedef {{ 
 * color: import("../rendering/canvas.js").HexColor,
 * }} VirtualPixel
 */
/**
 * @implements {Shader}
 */
export class Area extends Shader {
      /**
       * @type {string[]}
       */
      #matrix;
      x = 0;
      y = 0;
      z = 0;
      /**
       * @type {HexColor}
       */
      background = '#FFF';
      /**
       * @type {HexColor}
       */
      color = '#000';

      constructor() {
            super();
            this.#matrix = [];
      }

      /**
       * 
       * @param {number} lineNo 
       * @param {string} text 
       */
      setLine(lineNo, text) {
            if (lineNo >= this.#matrix.length) {
                  for (let i = this.#matrix.length; i < lineNo; i++) {
                        this.#matrix.push('');
                  }
            }

            this.#matrix[lineNo] = text;
      }
      /**
       * 
       * @param {number} lineNo 
       */
      getLine(lineNo) {
            return this.#matrix[lineNo] || '';
      }
      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {

            for (let i = 0; i < this.#matrix.length; i ++) {
                  for (let j = 0; j < this.#matrix[i].length; j++) {
                        screen.set({
                              x: j + this.x,
                              y: i + this.y,
                              z: this.z,
                              color: this.color,
                              background: this.background,
                              char: this.#matrix[i][j],
                        });
                  }
            }
      }
}
