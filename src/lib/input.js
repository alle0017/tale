/**@import {World} from "../ecs/World";*/
import List from "../types/List.js"
import { WorldManager } from "../ecs/WorldManager.js";
import EventManager from "../ecs/Event.js";

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
       * @type {List<(e: KeyboardEvent)=>void>}
       */
      const tasks = new List();

      /*window.addEventListener('keydown', e => {
            tasks.forEach(task => task(e));
      });

      window.addEventListener('keyup', e => {
            tasks.forEach(task => task(e));
      });*/

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
             * @type {(e: KeyboardEvent)=>void}
             */
            const handler = e => {
                  if (e.type === 'keyup') {
                        events.trigger('keyup')
                        return;
                  }

                  const key = e.key.toLowerCase();
                  let ev = key;

                  if (resolver.has(key)) {
                        ev = resolver.get(key);
                  }
                  events.trigger(ev);
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