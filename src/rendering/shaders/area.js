/**@import Screen from "../screen/screen.js";*/
/**@import {HexColor} from "../rendering/canvas.js" */
import { Shader } from "./shader.js";
import { BorderComponent } from "./border-component.js";
import { BoundingBoxComponent } from "./bounding-box.js";
/**@import { Parent } from "./layout/parent.js";*/

/**
 * @implements {Shader}
 */
export class Area extends Shader {
      /**
       * @type {Area}
       */
      static #activeElement = undefined;
      /**
       * @type {string[]}
       */
      #matrix;
      #autoWidth = 0;
      #border = new BorderComponent();
      #boundingBox = new BoundingBoxComponent();
      paddingX = 0;
      paddingY = 0;
      offsetX = 0;
      offsetY = 0;
      x = 0;
      y = 0;
      z = 0;
      maxWidth = 0;
      maxHeight = 0;
      /**
       * @type {HexColor}
       */
      background = '#FFF';
      /**
       * @type {HexColor}
       */
      color = '#000';
      /**
       * @type {Parent}
       * @readonly
       */
      parent;
      /**
       * @type {string[]}
       */
      classList = [];

      get border() {
            return this.#border;
      }

      get boxHeight() {
            return this.maxHeight && this.maxHeight < this.#matrix.length? this.maxHeight: this.#matrix.length;
      }

      get boxWidth() {
            return this.maxWidth && this.maxWidth < this.#autoWidth? this.maxWidth: this.#autoWidth;
      }

      set width(width) {
            this.resize(width, this.#matrix.length)
      }

      get width() {
            return this.#autoWidth;
      }

      set height(height) {
            this.resize(this.#autoWidth, height)
      }

      get height() {
            return this.#matrix.length;
      }

      get boundingBox() {
            return this.#boundingBox.boundingBox;
      }

      set boundingBox(box) {
            this.#boundingBox.boundingBox = box;
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
       * checks whether given coordinates are inside 
       * the area
       * @param {number} x 
       * @param {number} y 
       * @return {boolean}
       */
      contains(x,y) {
            const width = this.boxWidth;
            const height = this.boxHeight;
            return (
                  x >= this.x + this.offsetX &&
                  x <= this.x + this.offsetX + width &&
                  y >= this.y + this.offsetY &&
                  y <= this.y + this.offsetY + height
            );
      }
      /**
       * checks whether given coordinates are inside 
       * the area
       * @param {number} x 
       * @param {number} y 
       * @return {boolean}
       */
      isNear(x,y) {
            const width = this.boxWidth;
            const height = this.boxHeight;

            return (
                  x + 1 >= this.x + this.offsetX &&
                  x - 1 <= this.x + this.offsetX + width &&
                  y + 1 >= this.y + this.offsetY &&
                  y - 1 <= this.y + this.offsetY + height
            );
      }
      hasFocus() {
            return Area.#activeElement === this;
      }
      focus() {
            Area.#activeElement = this;
      }
      blur() {
            Area.#activeElement = undefined;
      }
      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            const height = this.maxHeight && this.maxHeight < this.#matrix.length? this.maxHeight: this.#matrix.length;
            
            for (let i = 0; i < height; i ++) {
                  const width = this.maxWidth && this.maxWidth < this.#matrix[i].length? this.maxWidth: this.#matrix[i].length;
                  for (let j = 0; j < width; j++) {
                        if (!this.#boundingBox.isInBoundingBox(j + this.x + this.offsetX, i + this.y + this.offsetY)) {
                              continue;
                        }
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

            const bh = this.maxHeight && this.maxHeight < this.#matrix.length? this.maxHeight: this.#matrix.length;
            const bw = this.maxWidth && this.maxWidth < this.#autoWidth? this.maxWidth: this.#autoWidth;

            this.#border.x = this.x + this.offsetX;
            this.#border.y = this.y + this.offsetY;
            this.#border.z = this.z;
            this.#border.draw(screen, bw, bh);
      }
}
