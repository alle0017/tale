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
                        state = setter(state, ...args);
                        events.trigger('change');
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