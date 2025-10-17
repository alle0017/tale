/**@import {World} from "../ecs/World.js";*/
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
       * @type {List<(e: string)=>void>}
       */
      const tasks = new List();

      //@ts-ignore
      process.stdin.setRawMode(true);
      //@ts-ignore
      process.stdin.resume();
      //@ts-ignore
      process.stdin.setEncoding("utf8");
      //@ts-ignore
      process.stdin.on("data", /**@param {string} key*/key => {
            if (key === "\u0003") {
                  //@ts-ignore
                  process.exit();
            }
            tasks.forEach(task => task(key));
      });

      return () => {
            const scene = WorldManager.current;
            const events = new EventManager();
            /**@type {Map<string,string>} */
            const resolver = new Map();
            
            resolver.set("\u001b[a", 'up');
            resolver.set("w", 'up');

            resolver.set("\u001b[b", 'down');
            resolver.set("s", 'down');

            resolver.set("\u001b[d", 'left');
            resolver.set("a", 'left');

            resolver.set("\u001b[c", 'right');
            resolver.set("d", 'right');

            /**
             * @type {(e: string) =>void}
             */
            const handler = e => {

                  const key = e.toLowerCase();
                  let ev = key;

                  if (resolver.has(key)) {
                        ev = resolver.get(key);
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