import List from "../types/List.js";
import EventManager from "./Event.js";
/**@import {Entity} from "./Entity" */

/**
 * @template {string} T
 * @template {{}} K
 * @typedef {{ 
 *    $$name: T, 
 *    state: K, 
 *    events: EventManager<'access'|'attached'|'removed'>,
 *    prototypes: string[]
 * }} Component
 */
/**
 * @template {string} K
 * @template {{}} T
 * @typedef {(e: Entity<{}>) => e is Entity<Record<K,T>>} Query
 */
/**
 * @typedef {{ 
 *    name: string, 
 *    factory: (...args: unknown[]) => Component<string,{}> 
 * }} $Component
 */
/**
 * hook responsible for component creation.
 * it will return a way to query the component
 * from system and a way to create it. Prototype can be assigned
 * as other ways to access the same component with different queries.
 * this is useful to implement inheritance into the component system
 */
export const createComponent = (() => {
      /**
       * @type {List<$Component>}
       */
      const symbols = new List();

      /**
       * @template {string} T
       * @template {{}} K
       * @template {unknown[]} X
       * @param {T} key
       * @param {(...params: X) => K} factory 
       * @param {string[]} prototypes
       * @returns {[Query<T,K>, (...args: X) => Component<T,K>]}
       */
      const create = (key, factory, ...prototypes) => {

            for (const comp of symbols) {
                  if (comp.name === key) {
                        throw new Error(`Illegal key used for component declaration: ${key}`);
                  }
            }

            const node = symbols.push({
                  name: key,
                  factory: (...props) => { 
                        //@ts-ignore
                        const state = factory(...props);
                        let isAccessingState = false;
                        return { 
                              prototypes,
                              events: new EventManager(),
                              get state() {
                                    if (!isAccessingState) {
                                          isAccessingState = true;
                                          this.events.trigger('access');
                                          isAccessingState = false;
                                    }
                                    return state;
                              }, 
                              $$name: key 
                        } 
                  }
            });

            return [
                  // @ts-ignore
                  e => e.has(key),
                  //@ts-ignore
                  node.value.factory
            ];
      };

      create.getAllComponents = () => symbols;

      return create;
})()