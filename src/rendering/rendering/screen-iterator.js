import Canvas, {COLOR_VEC_SIZE, EMPTY} from "./canvas.js";
export default class ScreenIterator {
      /**
       * @type {Readonly<Uint8Array>}
       */
      #buffer;
      #idx = 0;
      
      /**
       * 
       * @param {Uint8Array} buffer 
       */
      constructor(buffer) {
            this.#buffer = buffer;
      }

      next() {
            this.#idx += Canvas.Stride;
      }

      hasNext() {
            return this.#idx < this.#buffer.length;
      }

      color() {
            return this.#buffer
            .subarray(
                  this.#idx + Canvas.OffsetForeground, 
                  this.#idx + Canvas.OffsetForeground + COLOR_VEC_SIZE
            )
      }
      background() {
            return this.#buffer
            .subarray(
                  this.#idx + Canvas.OffsetBackground, 
                  this.#idx + Canvas.OffsetBackground + COLOR_VEC_SIZE
            )
      }
      primitive() {
            const code = 
                  (this.#buffer[this.#idx + Canvas.OffsetPrimitive] << 8) + 
                  this.#buffer[this.#idx + Canvas.OffsetPrimitive + 1];
            return String.fromCharCode(code || EMPTY);
      }
}