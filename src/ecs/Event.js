import List from "../types/List.js";
/**@typedef {({ data: {} }) => void} Listener */

/**
 * @template {string} K
 */
export default class EventManager {
      /**
       * @type {Map<K, List<Listener>>}
       */
      #hooks = new Map();

      constructor() {
            this.#hooks = new Map();
      }

      /**
       * 
       * @param {K} event 
       * @param {{}} data 
       */
      trigger(event, data = {}) {
            if (!this.#hooks.has(event)) {
                  return;
            }
            this.#hooks.get(event).forEach(hook => hook({ data }));
      }
      /**
       * 
       * @param {K} event 
       * @param {Listener} hook 
       */
      on(event, hook) {
            if (!this.#hooks.has(event)) {
                  this.#hooks.set(event, new List());
            }
            this.#hooks.get(event).push(hook);
            return () => this.#hooks.get(event).delete(hook);
      }
      /**
       * @param {K} event 
       * @param {Listener} hook 
       */
      remove(event, hook) {
            this.#hooks.get(event).delete(hook)
      }
}