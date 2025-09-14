import { useTaskManager } from "./TaskManager.js";
import { WorldManager } from "./WorldManager.js";
/**@import {Query} from "./Component.js" */
/**@import {Entity} from "./Entity.js" */

/**
 * @template {unknown[]} Q
 * @typedef {Q extends [infer X, ...infer Y]? (X extends Query<infer R, infer N> ? Record<R,N>: {}) & Union<Y>: {}} Union
 */

/**
 * create a `system` function, 
 * a method that is executed during each update.
 * Entities passed to it are the result of query execution
 * on all entities available into the game. 
 * the update is called on each entity, once each.
 * @template {string} K
 * @template {{}} U
 * @template {Query<K,U>[]} Q
 * @param {(entity: Entity<Union<Q>>) => void} update
 * @param {Q} query
 */
export const useSystem = (update, ...query) => {
      const system = () => {
            const allEntities = WorldManager.current.entities;

            for (const entity of allEntities) {
                  if (query.every(q => q(entity))) {
                        // @ts-ignore – entity has passed all type guards
                        update(entity);
                  }
            }
      };

      WorldManager.current.addSystem(system);

      useTaskManager().addTask(system);    
};
/**
 * create a `system` function, 
 * a method that is executed during each update.
 * Entities passed to it are the result of query execution
 * on all entities available into the game.
 * @template {string} K
 * @template {{}} U
 * @template {Query<K,U>[]} Q
 * @param {(entities: Entity<Union<Q>>[]) => void} update
 * @param {Q} query
 */
export const useUnhandledSystem = (update, ...query) => {
      const system = () => {
            const entities = WorldManager.current.entities.filter(entity => query.every(q => q(entity)));
            // @ts-ignore – entity has passed all type guards
            update(entities);
      };

      WorldManager.current.addSystem(system);

      useTaskManager().addTask(system);    
};