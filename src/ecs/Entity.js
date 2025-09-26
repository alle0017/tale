/**@import {Component,Query} from "./Component.js" */
import List from "../types/List.js";

/**
 * @template {{}} T
 * @typedef {{
 *    remove: <V extends keyof T>(
 *     component: V,
 *    ) => void,
 *    id: string,
 *    tags: List<string>,
 *    has(key: string): boolean,
 *    getAll(): Map<string, Component<string, unknown>>,
 *    add: <V extends string, X extends {}>(
 *     component: Component<V, X>,
 *   ) => Entity<T & { [K in V]: X }>,
 * } & T} Entity
 */

/**
 * function that creates an entity.
 * the entity must be added to the world to be queried, 
 * otherwise it will be **'invisible'** to systems
 * @template {{}} K
 * @return {Entity<K>}
 */
export const createEntity = () => {
      /**
       * @type {Map<string,Component<Readonly<string>,unknown>>}
       */
      const map = new Map();


      // @ts-ignore
      return new Proxy({
            id: `Entity_${createEntity.id++}`,
            tags: new List(),
            add(component) {
                  if (!component) {
                        throw new Error("illegal component addition");
                  }

                  map.set(component.$$name, component);

                  component.prototypes.forEach(proto => { 
                        map.set(proto, component)
                  });

                  component.events.trigger('attached');

                  return this;
            },
            remove(component) {
                  const key = /**@type {string}*/(component);

                  if (!map.has(key)) {
                        throw new Error("illegal component remove");
                  }
                  const e = map.get(key);

                  
                  map.delete(key);
                  
                  e.prototypes.forEach(proto => map.delete(proto));
                  
                  e.events.trigger('removed');

                  return this;
            },
            /**
             * @param {string} key 
             */
            has(key) {
                  return map.has(key);
            },
            /**
             * 
             * @returns 
             */
            getAll() {
                  return map;
            }
      }, {
            has(target, key) {
                  return map.has(key.toString()) || key in target;
            },
            get(target, key) {
                  if (target[key.toString()]) {
                        return target[key];
                  }

                  if (!map.has(key.toString())) {
                        throw new Error("illegal access to property");
                  }

                  return map.get(key.toString()).state;
            },
            set(target, key, value) {

                  if (target[key.toString()]) {
                        target[key.toString()] = value;
                        return true;
                  }

                  throw new Error("components cannot be overwritten");
            }
      })
};

createEntity.id = 0;