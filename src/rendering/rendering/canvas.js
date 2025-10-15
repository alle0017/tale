import Codes from "./codes.js"

/**@typedef {'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' } Hex */
/**@typedef {`#${Hex}${Hex}${Hex}`} HexColor */
/**@typedef {[number, number, number, number]} Color */

/**
 * 
 * @param {HexColor} color 
 * @returns {Color}
 */
const toColorVector = color => {
      /**
       * @type {Color}
       */
      const result = [1, 1, 1, 1];
      /**
       * @type {Hex[]}
       */
      const HEX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
      // value : 16 = x : 255
      for (let i = 1; i < color.length; i++) {
            result[i - 1] = HEX.indexOf(/**@type {Hex}*/(color[i])) * 255 /15;
      }
      return result;
}
const COLOR_VEC_SIZE = 4;
export const EMPTY_CHAR = ' ';
const EMPTY = EMPTY_CHAR.charCodeAt(0);


/**
 * @typedef {{
 *    background: HexColor,
 *    color: HexColor,
 *    char: string,
 *    x: number,
 *    y: number, 
 *    z: number,
 * }} Cell
 */
export default class Canvas {
      /**
       * @type {Uint8Array}
       */
      #screen;
      /**
       * @type {Uint8Array}
       */
      #depthBuffer;
      /**
       * @type {Uint16Array}
       */
      #primitive;
      /**
       * @readonly
       * @type {number}
       */
      #width;
      /**
       * @readonly
       * @type {number}
       */
      #height;

      #dirty = true;

      get width() {
            return this.#width;
      }
      get height() {
            return this.#height;
      }
      /**
       * 
       * @param {number} width 
       * @param {number} height 
       */
      constructor(width, height) {
            this.#screen = new Uint8Array(width*height*COLOR_VEC_SIZE*2); // background + foreground
            this.#depthBuffer = new Uint8Array(width*height);
            this.#primitive = new Uint16Array(width*height);
            this.#width = width;
            this.#height = height;
            this.clear();
      }
      /**
       * 
       * @param {number} x 
       * @param {number} y 
       */
      #getForegroundIndex(x, y) {
            return y * this.#width + x;
      }
      /**
       * 
       * @param {number} x 
       * @param {number} y 
       */
      #getDepthIndex(x, y) {
            return y * this.#width + x;
      }
      /**
       * 
       * @param {number} x 
       * @param {number} y 
       */
      #getPrimitiveIndex(x, y) {
            return y * this.#width + x;
      }
      /**
       * 
       * @param {number} x 
       * @param {number} y 
       */
      #getBackgroundIndex(x, y) {
            return y * this.#width + x + this.#width * this.#height;
      }
      /**
       * set a cell of the buffer with corresponding 
       * color and character. Note that characters occupies 2 row, 
       * so using different primitives instead of pixel must be done
       * carefully. in particular must be done by setting a primitive every 2 rows.
       * if a primitive is settled, it always uses the foreground color, while the the other raw impose 
       * the background (ex. if you use 'A' with color red in column 0 row 0 and set White in column 0 row 1, 
       * then 'A' will appear red on white)
       * @param {Cell} cell
       */
      set(cell) {
            const fg = this.#getForegroundIndex(cell.x, cell.y);
            const bg = this.#getBackgroundIndex(cell.x, cell.y);
            const depth = this.#getDepthIndex(cell.x, cell.y);
            const primitive = this.#getPrimitiveIndex(cell.x, cell.y);

            if (this.#depthBuffer[depth] > cell.z) {
                  return;
            } 
            const foreground = toColorVector(cell.color);
            const background = toColorVector(cell.background);

            for (let i = 0; i < COLOR_VEC_SIZE; i++) {

                  if (this.#screen[fg * COLOR_VEC_SIZE + i] !== foreground[i] || this.#screen[bg * COLOR_VEC_SIZE + i] !== background[i]) {
                        this.#dirty = true;
                  }
                  
                  this.#screen[fg * COLOR_VEC_SIZE + i] = foreground[i];
                  this.#screen[bg * COLOR_VEC_SIZE + i] = background[i];
            }
            this.#primitive[primitive] = cell.char.charCodeAt(0);
            this.#depthBuffer[depth] = cell.z;
      }

      /**
       * clear all the buffer stored
       */
      clear() {
            for (let i = 0; i < this.#screen.length; i++) {
                  this.#screen[i] = 0;
            }
            for (let i = 0; i < this.#primitive.length; i++) {
                  this.#primitive[i] = 0;
            }
            this.#dirty = true;
      }
      draw() {
            
            if (!this.#dirty) {
                  return;
            }
            
            let buffer = '';
            for (let y = 0; y < this.#height; y++) {
                  for (let x = 0; x < this.#width; x++) {
                        const primitive = this.#primitive[this.#getPrimitiveIndex(x, y)];
                        const foreground = this.#getForegroundIndex(x,y);
                        const background = this.#getBackgroundIndex(x,y);

                        const fg = Codes.Foreground(
                              this.#screen[COLOR_VEC_SIZE*foreground],
                              this.#screen[COLOR_VEC_SIZE*foreground + 1],
                              this.#screen[COLOR_VEC_SIZE*foreground + 2],
                              this.#screen[COLOR_VEC_SIZE*foreground + 3],
                        );
                        const bg = Codes.Background(
                              this.#screen[COLOR_VEC_SIZE*background],
                              this.#screen[COLOR_VEC_SIZE*background + 1],
                              this.#screen[COLOR_VEC_SIZE*background + 2],
                              this.#screen[COLOR_VEC_SIZE*background + 3],
                        );

                        buffer += bg + fg + String.fromCharCode(primitive || EMPTY) + Codes.Reset;
                  }
                  buffer += '\n';
            }
            console.log(Codes.Clear + Codes.Home + buffer)
            this.#dirty = false;
      }
}