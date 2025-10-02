/** @import { RigidBody } from ".." */
/**@import {Entity} from "../../ecs/Entity.js" */
/**@import {Component} from "../../ecs/Component.js" */


export default class ChunkIterator {
      /** @type {Entity[]} */
      #bodies;
      #current = 0;
      #chunkSize = 0;
      /**
       * @readonly
       * @type {Component<RigidBody,unknown[]>}
       */
      #component;

      /**
       * @param {Entity[]} bodies 
       * @param {Component<RigidBody,unknown[]>} component 
       */
      constructor(bodies, component) {
            this.#bodies = [];

            for (let i = 0; i < bodies.length; i++) {
                  this.#bodies.push(bodies[i]);
                  if (bodies[i].get(component).width > this.#chunkSize) {
                        this.#chunkSize = bodies[i].get(component).width; 
                  } 
            }
            // Sort bodies by x for spatial locality
            this.#bodies.sort((a, b) => a.get(component).x - b.get(component).x);
            this.#component = component;
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

                  if (this.#isColliding(center.get(this.#component), this.#bodies[i].get(this.#component))) {
                        chunk.push(this.#bodies[i]);
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

