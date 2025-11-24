import { SnapshotBuffer } from "./snapshot-buffer.js";
import ScreenIterator from "./screen-iterator.js";
/**@typedef {'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' } Hex */
/**@typedef {`#${Hex}${Hex}${Hex}` | 'none'} HexColor */
/**@typedef {`#${Hex}${Hex}${Hex}${Hex}`} AlphaHexColor */
/**@typedef {[number, number, number, number]} Color */

/**
 * 
 * @param {HexColor | AlphaHexColor} color 
 * @returns {Color}
 */
export const toColorVector = color => {
      if (color == 'none') {
            return [0,0,0,0];
      }
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
export const COLOR_VEC_SIZE = 4;
export const EMPTY_CHAR = ' ';
/**
 * 
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @returns {HexColor}
 */
export const rgb = (r, g, b) => {
      /**
       * @type {Hex[]}
       */
      const HEX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
      const red = /**@type {Hex}*/(HEX[Math.trunc(15 * r / 255)]);
      const green = /**@type {Hex}*/(HEX[Math.trunc(15 * g / 255)]);
      const blue = /**@type {Hex}*/(HEX[Math.trunc(15 * b / 255)]);
      return `#${red}${green}${blue}`;
}
export const EMPTY = EMPTY_CHAR.charCodeAt(0);


/**
 * @typedef {{
 *    background: HexColor | AlphaHexColor,
 *    color: HexColor,
 *    char: string,
 *    x: number,
 *    y: number, 
 *    z: number,
 * }} Cell
 */
/**
 * Canvas class for managing a 2D buffer of colored character cells,
 * supporting foreground/background color, depth, and primitive (character) data.
 * 
 * The buffer is designed for terminal-like rendering, where each cell can have
 * a foreground color, background color, character, and depth value for z-ordering.
 * @abstract
 */
export default class Canvas {
      static OffsetPrimitive = 9;
      static OffsetZ = 8;
      static OffsetBackground = 4;
      static OffsetForeground = 0;
      // foreground (4) + background (4) + z (1) + primitive (2)
      static Stride = COLOR_VEC_SIZE*2 + 1 + 2;
      /**
       * [
       *    fg: [r: i8,g: i8,b: i8,a: i8], bg: [r: i8,g: i8,b: i8,a: i8], depth: i8, primitive: i16
       * ]
       * @type {SnapshotBuffer<Uint8Array>}
       */
      buffer;
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

      dirty = true;

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
            this.buffer = new SnapshotBuffer(new Uint8Array(width*height*Canvas.Stride));
            this.#width = width;
            this.#height = height;
            this.clear();
      }
      /**
       * 
       * @param {number} x 
       * @param {number} y
       * @protected 
       */
      getIndex(x, y) {
            return y * this.#width * Canvas.Stride + x * Canvas.Stride;
      }
      /**
       * @protected
       * @returns true iff the screen needs to be repainted
       */
      needRedraw() {
            if (!this.dirty) {
                  return false;
            }

            if (this.buffer.isEqualToPrevious()) {
                  this.buffer.restore().discard();

                  this.dirty = false;
                  return false;
            }
            return true;
      }
      /**
       * 
       * @returns {ScreenIterator}
       */
      getScreen() {
            const buffer = this.buffer.peek();

            this.buffer.discard();

            return new ScreenIterator(buffer);
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
            const idx = this.getIndex(cell.x, cell.y)
            const buffer = this.buffer.peek();


            if (buffer[idx + Canvas.OffsetZ] > cell.z) {
                  return;
            } 

            const currentForeground = buffer
                  .subarray(
                        idx + Canvas.OffsetForeground, 
                        idx + Canvas.OffsetForeground + COLOR_VEC_SIZE
                  );
            const currentBackground = 
            buffer
                  .subarray(
                        idx + Canvas.OffsetBackground, 
                        idx + Canvas.OffsetBackground + COLOR_VEC_SIZE
                  );
            const foreground = cell.color !== 'none' ? 
                  toColorVector(cell.color): 
                  currentForeground;
            const background = cell.background !== 'none' ? 
                  toColorVector(cell.background): 
                  currentBackground;

            for (let i = 0; i < COLOR_VEC_SIZE; i++) {

                  if (currentForeground[i] !== foreground[i] || currentBackground[i] !== background[i]) {
                        this.dirty = true;
                  }
                  buffer[idx + Canvas.OffsetForeground + i] = foreground[i];
                  buffer[idx + Canvas.OffsetBackground + i] = background[i];
            }

            if (cell.color !== 'none') {
                  const code = cell.char.charCodeAt(0);
                  // split the code into two bytes
                  buffer[idx + Canvas.OffsetPrimitive] = code >> 8;
                  buffer[idx + Canvas.OffsetPrimitive + 1] = code;
            }

            buffer[idx + Canvas.OffsetZ] = cell.z;
      }

      /**
       * clear all the buffer stored
       */
      clear() {
            const buffer = this.buffer.snapshot().peek();

            for (let i = 0; i < buffer.length; i++) {
                  buffer[i] = 0;
            }
            this.dirty = true;
      }
      /**
       * @abstract
       */
      draw() {}
}