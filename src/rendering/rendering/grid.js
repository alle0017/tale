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
const EMPTY = ' '.charCodeAt(0);
export default class Grid {
      /**
       * @type {Uint8Array}
       */
      #screen;
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
      /**
       * 
       * @param {number} width 
       * @param {number} height 
       */
      constructor(width, height) {
            this.#screen = new Uint8Array(width*height*COLOR_VEC_SIZE);
            this.#primitive = new Uint16Array(width*height);
            this.#width = width;
            this.#height = height;
            this.clear();
      }
      /**
       * 
       * @param {HexColor} color 
       * @param {number} x 
       * @param {number} y 
       * @param {string} primitive
       */
      set(color, x, y, primitive) {
            const idx = y * this.#width + x;
            const vec = toColorVector(color);

            for (let i = 0; i < COLOR_VEC_SIZE; i++) {
                  this.#screen[idx * COLOR_VEC_SIZE + i] = vec[i];
            }
            this.#primitive[idx] = primitive.charCodeAt(0);
      }

      clear() {
            for (let i = 0; i < this.#screen.length; i++) {
                  this.#screen[i] = 0;
            }
            for (let i = 0; i < this.#primitive.length; i++) {
                  this.#primitive[i] = 0;
            }
      }
      draw() {
            let buffer = '';
            for (let y = 0; y < this.#height/2; y += 2) {
                  for (let x = 0; x < this.#width; x++) {
                        const top = y * this.#width + x;
                        const bottom = (y + 1)* this.#width + x;

                        let fg;
                        let bg;
                        let primitive;

                        if (this.#primitive[bottom] != 0) {
                              fg = Codes.Foreground(
                                    this.#screen[COLOR_VEC_SIZE*bottom],
                                    this.#screen[COLOR_VEC_SIZE*bottom + 1],
                                    this.#screen[COLOR_VEC_SIZE*bottom + 2],
                                    this.#screen[COLOR_VEC_SIZE*bottom + 3],
                              );
                              bg = Codes.Background(
                                    this.#screen[COLOR_VEC_SIZE*top],
                                    this.#screen[COLOR_VEC_SIZE*top + 1],
                                    this.#screen[COLOR_VEC_SIZE*top + 2],
                                    this.#screen[COLOR_VEC_SIZE*top + 3],
                              );
                              primitive = this.#primitive[bottom];
                        } else {
                              fg = Codes.Foreground(
                                    this.#screen[COLOR_VEC_SIZE*top],
                                    this.#screen[COLOR_VEC_SIZE*top + 1],
                                    this.#screen[COLOR_VEC_SIZE*top + 2],
                                    this.#screen[COLOR_VEC_SIZE*top + 3],
                              );
                              bg = Codes.Background(
                                    this.#screen[COLOR_VEC_SIZE*bottom],
                                    this.#screen[COLOR_VEC_SIZE*bottom + 1],
                                    this.#screen[COLOR_VEC_SIZE*bottom + 2],
                                    this.#screen[COLOR_VEC_SIZE*bottom + 3],
                              );
                              primitive = this.#primitive[top] != 0? this.#primitive[top]: EMPTY;
                        }
                        buffer += bg + fg + String.fromCharCode(primitive) + Codes.Reset;
                  }
                  buffer += '\n';
            }
            console.log(buffer)
      }
}