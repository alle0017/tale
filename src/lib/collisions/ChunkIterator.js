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
            this.#bodies = [];

            for (let i = 0; i < bodies.length; i++) {
                  this.#bodies.push(bodies[i]);
                  if (bodies[i].body.width > this.#chunkSize) {
                        this.#chunkSize = bodies[i].body.width; 
                  } 
            }
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
            const al = a.x - a.width;
            const ar = a.x + a.width;
            const ab = a.y - a.height;
            const at = a.y + a.height;

            const bl = b.x - b.width;
            const br = b.x + b.width;
            const bb = b.y - b.height;
            const bt = b.y + b.height;

            // True if intervals overlap in both axes.
            // Use strict inequalities so edge-touching does NOT count as collision.
            return al < br && ar > bl && ab < bt && at > bb;
      }

      getCurrent() {
            return this.#bodies[this.#current];
      }

      getChunk() {
            const chunk = [];
            const center = this.getCurrent();

            for (let i = 0; i < this.#bodies.length; i++) {
                  if (center === this.#bodies[i]) {
                        continue;
                  }

                  if (this.#isColliding(center.body, this.#bodies[i].body)) {
                        chunk.push(this.#bodies[i]);
                  }
            }

            // Scan left
            /*for (let i = this.#current - 1; i >= 0; i--) {
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
            }*/

            return chunk;
      }

      hasNext() {
            return this.#current < this.#bodies.length;
      }

      next() {
            this.#current++;
      }
}

