/**@import {World} from "./World" */
import EventManager from "./Event.js";

/**
 * class that handles {@link World} lifecycle.
 */
export class WorldManager {
      /**
       * @type {EventManager<'enter'>}
       */
      static #events = new EventManager();
      /**
       * current world in execution
       * @type {World}
       */
      static #current;
      /**
       * change the current world.
       * stopping previous systems and 
       * replacing all old entities.
       * they will remain in the old world, 
       * that can be later resumed
       * @param {World} world 
       */
      static use(world) {
            if (WorldManager.#current) {
                  WorldManager.#current.onLeave();
            }
            WorldManager.#current = world;
            WorldManager.events.trigger('enter', world);
            world.onEnter();
      }
      /**
       * current world in execution
       */
      static get current() {
            return WorldManager.#current;
      }
      static get events() {
            return WorldManager.#events;
      }
}