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
       * @type {Map<'change'|'enter'|'leave',Set<() => void>>}
       */
      #hooks = new Map();
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
      set entities(value) {
            this.#entities.clear();
            for (let i = 0; i < value.length; i++) {
                  this.#entities.add(value[i]);
            }
      }

      constructor() {
            this.#hooks.set('change', new Set());
            this.#hooks.set('enter', new Set());
            this.#hooks.set('leave', new Set());
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
            for (const hook of this.#hooks.get('change')) {
                  hook();
            }
      }
      /**
       * remove the specified entity from the world
       * @param {Entity<{}>} entity 
       */
      remove(entity) {
            this.#entities.delete(entity);
            for (const hook of this.#hooks.get('change')) {
                  hook();
            }
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
            for (const hook of this.#hooks.get('leave')) {
                  hook();
            }
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
            for (const hook of this.#hooks.get('enter')) {
                  hook();
            }
      }

      /**
       * lifecycle hook called each time an 
       * entity is added or removed from the system
       * @param {() => void} hook 
       */
      onStateChange(hook) {
            this.#hooks.get('change').add(hook);
            return () => this.#hooks.get('change').delete(hook);
      }
      /**
       * @param {() => void} callback
       */
      onResume(callback) {
            this.#hooks.get('enter').add(callback);
            return () => this.#hooks.get('enter').delete(callback);
      }
      /**
       * @param {() => void} callback
       */
      onStop(callback) {
            this.#hooks.get('leave').add(callback);
            return () => this.#hooks.get('leave').delete(callback);
      }
}