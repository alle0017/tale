import EventManager from "./Event.js";

/**
 * @template {{}} T
 * @template {unknown[]} Args
 * @typedef {(state: T, ...args: Args) => T} Setter 
 */
/**
 * @template {{}} T
 * @template K
 * @typedef {(state: T) => K} Getter 
 */
/**
 * @template {{}} T
 * @param {T} state
 */
export const State = state => {
      /**
       * @type {EventManager<'change'|'before-change'|'after-change'>}
       */
      const events = new EventManager();

      return {
            events,
            /**
             * @template {unknown[]} Args
             * @param {Setter<T,Args>} setter 
             */
            mutator: (setter) => {
                  /**
                   * @param {Args} args
                   */
                  return (...args) => {
                        const prev = state;
                        events.trigger('before-change');
                        state = setter(state, ...args);
                        events.trigger('change', { previousState: prev });
                  }
            },
            /**
             * @template K
             * @param {Getter<T,K>} getter 
             */
            observer: getter => {
                  return () => getter(state)
            }
      }
}