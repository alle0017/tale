/**@import { System } from "../../components/index.js"*/
/**@import {RigidBody} from ".." */
import { createSystem } from "../../components/index.js";
import ChunkIterator from "./ChunkIterator.js";

/**
 * create a collision system where, 
 * each body registered to it, is checked
 * to see whether is colliding with 
 * something else, in that case triggers 
 * an event of collision
 * @returns {System<RigidBody>}
 */
export function useCollisionSystem() {
      return createSystem(bodies => {
            const iterator = new ChunkIterator(bodies);

            while (iterator.hasNext()) {
                  const chunk = iterator.getChunk();

                  for (const body of chunk) {
                        iterator.getCurrent().triggerCollision(body);
                  }
                  iterator.next();
            }
      });
}