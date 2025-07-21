import ChunkIterator from "./ChunkIterator.js";
import { createComponent } from "../../ecs/Component.js";
import { WorldManager } from "../../ecs/WorldManager.js";
import { useTaskManager, Priority } from "../../ecs/TaskManager.js";
import List from "../../types/List.js"
/**@import {RigidBody} from ".." */

export const [body,useBody] = createComponent('body', /**@returns {RigidBody} */() => {
      /**@type {List<(body: RigidBody) => void>} */
      const subs = new List();

      
      return {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
            onCollision: watcher => {
                  let node = subs.push(watcher);

                  return () => {
                        if (!node) {
                              return;
                        }
                        subs.remove(node);
                        node = null;
                  };
            },
            triggerCollision(body) {
                  subs.forEach(sub => sub(body))
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