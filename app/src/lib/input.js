/**@import {World} from "../ecs/World";*/
import List from "../types/List.js"
import { WorldManager } from "../ecs/WorldManager.js";

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

      window.addEventListener('keydown', e => {
            tasks.forEach(task => task(e));
      });

      return () => {
            const scene = WorldManager.current;
            /**@type {Map<string,List<() => void>>} */
            const listeners = new Map();
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
                  const key = e.key.toLowerCase();
                  let ev = key;

                  if (resolver.has(key)) {
                        ev = resolver.get(key);
                  }

                  if (!listeners.has(ev)) {
                        return;
                  }

                  listeners.get(ev).forEach(sub => sub());
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
                  /**
                   * set an event handler attached 
                   * to an abstract event.
                   * @param {string} event 
                   * @param {() => void} handler 
                   */
                  on: (event, handler) => {
                        if (!listeners.has(event)) {
                              listeners.set(event, new List());
                        }

                        let node = listeners.get(event).push(handler);

                        return () => {
                              if (!node) {
                                    return;
                              }
                              listeners.get(event).remove(node);
                              node = null;
                        };
                  },
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