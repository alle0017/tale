/**
 * @template {{ length: number }} T
 */
export class SnapshotBuffer {
      /**
       * @type {T}
       */      
      #buffer;
      /**
       * @type {T}
       */
      #snapshot;

      /**
       * 
       * @param {T} buffer 
       */
      constructor(buffer) {
            this.#buffer = buffer;
      }
      
      peek() {
            return this.#buffer;
      }
      
      snapshot() {
            this.#snapshot = new (Object.getPrototypeOf(this.#buffer).constructor)(this.#buffer.length);
            
            for (let i = 0; i < this.#buffer.length; i++) {
                  this.#snapshot[i] = this.#buffer[i];
            }
      }

      restore() {
            this.#buffer = this.#snapshot;
      }

      discardOld() {
            this.#snapshot = undefined;
      }

      isEqualToPrevious() {
            if (!this.#snapshot) {
                  return false;
            }

            for (let i = 0; i < this.#buffer.length; i++) {
                  if (this.#buffer[i] !== this.#snapshot[i]) {
                        return false;
                  }
            }
            return true;
      }
}