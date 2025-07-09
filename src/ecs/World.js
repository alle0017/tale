/**@import {Entity} from "./Entity" */
import { useTaskManager } from "./TaskManager.js";

/**
 * class that handles world.
 * world are micro-cosmos, composed 
 * of entities and systems
 * that acts only on that entities. 
 * only one world can exist at time
 */
export class World {
      /**
       * @type {Set<Entity<{}>>}
       */
      #entities = new Set();
      /**
       * @type {Map<() => void, number>}
       */
      #systems = new Map();
      get entities() {
            return [...this.#entities];
      }
      /**
       * add new entity into the world. 
       * from the moment an entity is added,
       * until it is removed with {@link World.remove()}, 
       * the entity will be affected to systems
       * that can query it.
       * @param {Entity<{}>} entity 
       */
      add(entity) {
            this.#entities.add(entity);
      }
      /**
       * remove the specified entity from the world
       * @param {Entity<{}>} entity 
       */
      remove(entity) {
            this.#entities.delete(entity);
      }

      /**
       * add system to the tracked once.
       * A system that is tracked is dependant 
       * to the World for its execution
       * @param {() => void} system 
       */
      addSystem(system, priority = 0) {
            this.#systems.set(system, priority);
      }

      /**
       * cleanup method called 
       * when the World leave
       */
      onLeave() {
            useTaskManager().clearAll();
      }

      /**
       * method used when the World
       * is started. All systems attached to it are
       * restarted
       */
      onEnter() {
            this.#systems.forEach((priority, system) => {
                  if (priority > 0) {
                        useTaskManager().addAnimationTask(system);
                  } else {
                        useTaskManager().addTask(system);
                  }
            });
      }
}