/** @import { RigidBody } from ".." */
/**@import {Entity} from "../../ecs/Entity.js" */

export default class ChunkIterator {
      /** @type {Entity<Record<'body',RigidBody>>[]} */
      #bodies;
      #current = 0;
      #chunkSize = 0;

      /**
       * @param {Entity<Record<'body',RigidBody>>[]} bodies 
       */
      constructor(bodies) {
            this.#bodies = [...bodies];

            // Set chunk size to a reasonable proximity range (e.g., max width)
            this.#chunkSize = Math.max(...this.#bodies.map(b => b.body.width), 1);

            // Sort bodies by x for spatial locality
            this.#bodies.sort((a, b) => a.body.x - b.body.x);
      }

      /**
       * 
       * @param {RigidBody} a 
       * @param {RigidBody} b 
       * @returns 
       */
      #isColliding(a, b) {
            return (
                  a.x < b.x + b.width &&
                  a.x + a.width > b.x &&
                  a.y < b.y + b.height &&
                  a.y + a.height > b.y
            );
      }

      getCurrent() {
            return this.#bodies[this.#current];
      }

      getChunk() {
            const chunk = [];
            const center = this.getCurrent();

            // Scan left
            for (let i = this.#current - 1; i >= 0; i--) {
                  const other = this.#bodies[i];

                  if (other.body.x + other.body.width < center.body.x - this.#chunkSize) {
                        break;
                  }

                  if (this.#isColliding(center.body, other.body)) {
                        chunk.push(other);
                  }
            }

            // Scan right
            for (let i = this.#current + 1; i < this.#bodies.length; i++) {
                  const other = this.#bodies[i];

                  if (other.body.x > center.body.x + center.body.width + this.#chunkSize) {
                        break;
                  }

                  if (this.#isColliding(center.body, other.body)) {
                        chunk.push(other);
                  }
            }

            return chunk;
      }

      hasNext() {
            return this.#current < this.#bodies.length;
      }

      next() {
            this.#current++;
      }
}
