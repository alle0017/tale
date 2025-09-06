/**@import {Entity} from "./Entity" */
import { useTaskManager } from "./TaskManager.js";
import EventManager from "./Event.js";

/**
 * class that handles world.
 * world are micro-cosmos, composed 
 * of entities and systems
 * that acts only on that entities. 
 * only one world can exist at time
 */
export class World {
      /**
       * @type {EventManager<'change' | 'leave' | 'enter'>}
       */
      #events = new EventManager();
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

      get events() {
            return this.#events;
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
            this.#events.trigger('change');
      }
      /**
       * remove the specified entity from the world
       * @param {Entity<{}>} entity 
       */
      remove(entity) {
            this.#entities.delete(entity);
            this.#events.trigger('change');
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
            this.#events.trigger('leave');
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
            this.#events.trigger('enter');
      }

      /**
       * lifecycle hook called each time an 
       * entity is added or removed from the system
       * @param {() => void} hook 
       */
      onStateChange(hook) {
            return this.#events.on('change', hook);
      }
      /**
       * @param {() => void} callback
       */
      onResume(callback) {
            return this.#events.on('enter', callback);
      }
      /**
       * @param {() => void} callback
       */
      onStop(callback) {
            return this.#events.on('leave', callback);
      }
}