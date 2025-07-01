/**@import {RigidBody} from ".." */
export default class ChunkIterator {

      #chunk = 0;
      /**@type {RigidBody[]} */
      #bodies;
      #current = 0;

      /**
       * 
       * @param {RigidBody[]} bodies 
       */
      constructor(bodies) {
            this.#bodies = [...bodies];
            this.#bodies.sort((a,b) => {

                  if (a.width < this.#chunk) {
                        this.#chunk = a.width;
                  }

                  if (b.width < this.#chunk) {
                        this.#chunk = b.width;
                  }

                  return a.x - b.x;
            });
      }
      
      getCurrent() {
            return this.#bodies[this.#current];
      }

      getChunk() {
            const chunk = [];
            const center = this.#bodies.at(this.#current);

            for (let i = this.#current - 1; i >= 0; i--) {
                  const curr = this.#bodies.at(i);

                  if (curr.x + this.#chunk < center.x) {
                        break;
                  }

                  if (
                        curr.x + curr.width >= center.x &&
                        ((curr.y <= center.y && curr.y + curr.height >= center.y) ||
                        (curr.y >= center.y && curr.y >= center.y + center.height))
                  ) {
                        chunk.push(curr);
                  }
            }

            for (let i = this.#current + 1; i < this.#bodies.length; i++) {
                  const curr = this.#bodies.at(i);

                  if (center.x + this.#chunk < curr.x) {
                        break;
                  }

                  if (
                        center.x + center.width >= curr.x &&
                        ((curr.y <= center.y && curr.y + curr.height >= center.y) ||
                        (curr.y >= center.y && curr.y >= center.y + center.height))
                  ) {
                        chunk.push(curr);
                  }
            }

            return chunk;
      }

      hasNext() {
            return this.#current < this.#bodies.length;
      }

      next() {
            this.#current++;

            if (this.#current >= this.#bodies.length) {
                  this.#current = this.#bodies.length - 1;
            }
      }
}