import ChunkIterator from "./ChunkIterator.js";
import { createComponent } from "../../ecs/Component.js";
import { WorldManager } from "../../ecs/WorldManager.js";
import { useTaskManager, Priority } from "../../ecs/TaskManager.js";
/**@import {RigidBody} from ".." */

export const [body,useBody] = createComponent('body', /**@returns {RigidBody} */() => {
      /**@type {Set<(body: RigidBody) => void>} */
      const subs = new Set();

      
      return {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
            onCollision: watcher => {
                  subs.add(watcher);

                  return () => subs.delete(watcher);
            },
            triggerCollision(body) {
                  for (const sub of subs) {
                        sub(body);
                  }
            }
      }
});
/**
 * create a collision system where, 
 * each body registered to it, is checked
 * to see whether is colliding with 
 * something else, in that case triggers 
 * an event of collision
 */
export function useCollisionSystem() {
      const system = () => {
            const iterator = new ChunkIterator(entities);

            while (iterator.hasNext()) {
                  const chunk = iterator.getChunk();

                  for (const body of chunk) {
                        iterator.getCurrent().triggerCollision(body);
                  }
                  iterator.next();
            }
      };
      let entities = WorldManager.current.entities.filter(body);

      WorldManager.current.onStateChange(() => {
            entities = WorldManager.current.entities.filter(body);
      });

      WorldManager.current.addSystem(system, Priority.LOW);

      useTaskManager().addTask(system);
}