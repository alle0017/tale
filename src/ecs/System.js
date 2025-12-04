import { useTaskManager } from "./TaskManager.js";
//import { WorldManager } from "./WorldManager.js";
import { getScene, } from "./scene.js";
/**@import {Component, Query} from "./Component.js" */
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
 * @param {(entity: Entity) => void} update
 * @param {Component<unknown, unknown[]>[]} query
 */
export const useSystem = (update, ...query) => {
      const system = () => {
            const allEntities = getScene().entities;

            for (const entity of allEntities) {
                  let flag = true;

                  for (let i = 0; i < query.length && flag; i++) {
                        flag &&= entity.has(query[i]);
                  }

                  if (flag) {
                        update(entity);
                  }
            }
      };

      //WorldManager.current.addSystem(system);

      useTaskManager().addTask(system);    
};
/**
 * create a `system` function, 
 * a method that is executed during each update.
 * Entities passed to it are the result of query execution
 * on all entities available into the game.
 * @param {(entities: Entity[]) => void} update
 * @param {Component<unknown, unknown[]>[]} query
 */
export const useUnhandledSystem = (update, ...query) => {
      const system = () => {
            const entities = getScene()
                  .entities
                  .filter(entity => {
                        let flag = true;
                        for (let i = 0; i < query.length && flag; i++) {
                              flag &&= entity.has(query[i]);
                        }
                        return flag;
                  });
            update(entities);
      };

      //WorldManager.current.addSystem(system);

      useTaskManager().addTask(system);    
};

/** 
 * create a `system` function, 
 * a method that is executed during each update.
 * Entities passed to it are the result of query execution
 * on all entities available into the game.
 * @param {(entities: Entity[]) => void} update
 * @param {Component<unknown, unknown[]>[]} query
 */
export const useAnimationSystem = (update, ...query) => {
      const system = () => {
            const entities = getScene()
                  .entities
                  .filter(entity => {
                        let flag = true;
                        for (let i = 0; i < query.length && flag; i++) {
                              flag &&= entity.has(query[i]);
                        }
                        return flag;
                  });
            update(entities);
      };

      //WorldManager.current.addSystem(system);

      useTaskManager().addAnimationTask(system);    
};