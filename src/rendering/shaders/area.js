/**@import Screen from "../screen/screen.js";*/
/**@import {HexColor} from "../rendering/canvas.js" */
import { Shader } from "./shader.js";
import { BorderComponent } from "./border-component.js";
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
      offsetX = 0;
      offsetY = 0;
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

      get boxHeight() {
            return this.height && this.height < this.#matrix.length? this.height: this.#matrix.length;
      }

      get boxWidth() {
            return this.width && this.width < this.#autoWidth? this.width: this.#autoWidth;
      }

      constructor() {
            super();
            this.#matrix = [];
      }

      /**
       * set minimum height and width to the specified ones.
       * if the area has less lines then height, then lines are generated,
       * nothing will happen otherwise. the same is applied
       * for width.
       * @param {number} width 
       * @param {number} height 
       */
      resize(width, height) {
            if (this.#autoWidth < width) {
                  this.#autoWidth = width;
            }
            for (let i = 0; i < this.#matrix.length; i++) {
                  if (this.#matrix[i].length < width) {
                        this.#matrix[i] += ' '.repeat(width - this.#matrix[i].length);
                  }
            }
            if (height >= this.#matrix.length) {
                  for (let i = this.#matrix.length; i < height; i++) {
                        this.#matrix.push(' '.repeat(width));
                  }
            }
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
       * @param {number} row 
       * @param {number} col 
       * @param {string} char 
       */
      setChar(row,col,char) {
            this.resize(row, col);
            this.#matrix[row] = this.#matrix[row].slice(0, col) + char[0] + this.#matrix[row].slice(col + 1);
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
                  for (let j = 0; j < width; j++) {
                        screen.set({
                              x: j + this.x + this.offsetX,
                              y: i + this.y + this.offsetY,
                              z: this.z,
                              color: this.color,
                              background: this.background,
                              char: this.#matrix[i][j],
                        });
                  }
            }

            const bh = this.height && this.height < this.#matrix.length? this.height: this.#matrix.length;
            const bw = this.width && this.width < this.#autoWidth? this.width: this.#autoWidth;

            this.#border.x = this.x + this.offsetX;
            this.#border.y = this.y + this.offsetY;
            this.#border.z = this.z;

            this.#border.draw(screen, bw, bh);
      }
}
