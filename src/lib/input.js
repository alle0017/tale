/**@import Scene from "../game/Scene.js";*/

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
       * @type {Set<(e: KeyboardEvent)=>void>}
       */
      const tasks = new Set();

      window.addEventListener('keydown', e => {
            for (const task of tasks) {
                  task(e);
            }
      });

      return /**@param {Scene} scene*/scene => {
            /**@type {Map<string,Set<() => void>>} */
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

                  for (const sub of listeners.get(ev)) {
                        sub();
                  }
            };

            tasks.add(handler);

            const resume = scene.onResume(() => tasks.add(handler));
            const stop = scene.onStop(() => tasks.delete(handler));
            const clear = scene.onClear(() => {
                  resume();
                  stop();
                  clear();
                  tasks.delete(handler);
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
                              listeners.set(event, new Set());
                        }

                        listeners.get(event).add(handler);

                        return () => listeners.get(event).delete(handler);
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