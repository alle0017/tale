/**@import {Entity} from "./Entity" */

/**
 * @template {string} T
 * @template {{}} K
 * @typedef {{ $$name: T, state: K }} Component
 */
/**
 * @template {string} K
 * @template {{}} T
 * @typedef {(e: Entity<{}>) => e is Entity<T>} Query
 */
/**
 * hook responsible for component creation.
 * it will return a way to query the component
 * from system and a way to create it.
 */
export const createComponent = (() => {
      /**
       * @type {Set<string>}
       */
      const symbols = new Set();

      /**
       * @template {string} T
       * @template {{}} K
       * @template {unknown[]} X
       * @param {T} key
       * @param {(...params: X) => K} factory 
       * @returns {[Query<T,K>, (...args: X) => Component<T,K>]}
       */
      return (key, factory) => {

            if (symbols.has(key)) {
                  throw new Error(`Illegal key used for component declaration: ${key}`);
            }

            symbols.add(key);

            return [
                  // @ts-ignore
                  e => e.has(key),
                  (...props) => { 
                        return { state: factory(...props), $$name: key } 
                  }
            ];
      }
})()
