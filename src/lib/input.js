/**@import {World} from "../ecs/World.js";*/
import List from "../types/List.js"
import { WorldManager } from "../ecs/WorldManager.js";
import EventManager from "../ecs/Event.js";
import { bootstrap } from "./platform/term.js";
import { getEvent, isMouseString } from "./platform/mouse.js";

/**
 * hook used to define input events.
 * every event is attached to the scene passed, 
 * in particular every event defined is reused 
 * if the scene is resumed, is stopped if the
 * scene is stopped, and is completely dropped if
 * the scene is cleared
 */
export const useInput = (() => {
      /**
       * @type {List<(e: string)=>void>}
       */
      const tasks = new List();

      bootstrap(key => {
            tasks.forEach(task => task(key));
      });

      return () => {
            const scene = WorldManager.current;
            const events = new EventManager();
            /**@type {Map<string,string>} */
            const resolver = new Map();
            
            resolver.set("arrowup", 'up');
            resolver.set("w", 'up');

            resolver.set("arrowdown", 'down');
            resolver.set("s", 'down');

            resolver.set("arrowleft", 'left');
            resolver.set("a", 'left');

            resolver.set("arrowright", 'right');
            resolver.set("d", 'right');

            /**
             * @type {(e: string) =>void}
             */
            const handler = e => {

                  let ev = e;

                  if (isMouseString(ev)) {
                        const event = getEvent(ev);

                        events.trigger(event.action, event);
                        events.trigger('any', { key: event.action });
                        return;
                  }

                  if (resolver.has(ev)) {
                        ev = resolver.get(ev);
                  }
                  events.trigger(ev);
                  events.trigger('any', { key: ev });
            };

            let node = tasks.push(handler);

            scene.onResume(() => {
                  node = tasks.push(handler)
            });

            scene.onStop(() => {
                  if (!node) {
                        return;
                  }
                  tasks.remove(node)
                  node = null;
            });

            return {
                  events,
                  /**
                   * map an abstract event onto a key.
                   * @param {string} ev 
                   * @param {string} key 
                   */
                  addMapping: (ev,key) => {
                        resolver.set(key.toLowerCase(), ev);
                  },
                  /**
                   * remove previously set mapping
                   * @param {string} key 
                   */
                  removeMapping: key => {
                        resolver.delete(key.toLowerCase());
                  }
            }
      }
})()