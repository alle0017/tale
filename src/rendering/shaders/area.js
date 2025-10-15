/**@import Screen from "../screen/screen.js";*/
/**@import {HexColor} from "../rendering/canvas.js" */
import { Shader } from "./shader.js";
import { Border, BorderComponent } from "./border.js";
/**
 * @implements {Shader}
 */
export class Area extends Shader {
      /**
       * @type {string[]}
       */
      #matrix;
      #autoWidth = 0;
      #border = new BorderComponent();
      x = 0;
      y = 0;
      z = 0;
      width = 0;
      height = 0;
      /**
       * @type {HexColor}
       */
      background = '#FFF';
      /**
       * @type {HexColor}
       */
      color = '#000';

      get border() {
            return this.#border;
      }

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

            if (text.length > this.#autoWidth) {
                  this.#autoWidth = text.length;
            }
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
            const height = this.height && this.height < this.#matrix.length? this.height: this.#matrix.length;
            
            for (let i = 0; i < height; i ++) {
                  const width = this.width && this.width < this.#matrix[i].length? this.width: this.#matrix[i].length;
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

            const bh = this.height && this.height < this.#matrix.length? this.height: this.#matrix.length;
            const bw = this.width && this.width < this.#autoWidth? this.width: this.#autoWidth;

            this.#border.x = this.x;
            this.#border.y = this.y;
            this.#border.z = this.z;

            this.#border.draw(screen, bw, bh);
      }
}
