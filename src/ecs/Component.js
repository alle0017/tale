import EventManager from "./Event.js";
/**@import {Entity} from "./Entity.js" */

/**
 * @template {{}} K
 * @template {unknown[]} X
 * @typedef {{ 
 *    prototypes: readonly Component<unknown,unknown[]>[]
 *    events: EventManager<'access'|'attached'|'removed'>,
 *    create(...args: X): K & { $$proto: Component<K,X> },
 *    attach(entity: number, component: K): K,
 *    get(entity: number): K,
 *    delete(entity: number): K,
 *    getAll(): K[],
 * }} Component
 */
/**
 * @template {string} K
 * @template {{}} T
 * @typedef {(e: Entity) => e is Entity} Query
 */
/**
 * hook responsible for component creation.
 * it will return a way to query the component
 * from system and a way to create it. Prototype can be assigned
 * as other ways to access the same component with different queries.
 * this is useful to implement inheritance into the component system
 * @template {{}} K
 * @template {unknown[]} X
 * @param {(...params: X) => K} factory 
 * @param {Component<unknown,unknown[]>[]} prototypes
 * @returns {Component<K, X>}
 */
export const createComponent = (factory, ...prototypes) => {
      /**
       * @type {K[]}
       */
      const entities = [];

      /**
       * @type {Component<K, X>}
       */
      const component = { 
            prototypes,
            events: new EventManager(),
            create: (...args) => {
                  const instance = factory(...args);
                  return Object.assign(instance, {
                        $$proto: component,
                  });
            },
            attach(e, component) {
                  entities[e] = component;

                  for (let i = 0; i < prototypes.length; i++) {
                        prototypes[i].attach(e, entities[e]);
                  }

                  return entities[e];
            },
            get(e) {
                  return entities[e];
            },
            delete(e) {
                  const component = entities[e];
                  entities[e] = undefined;
                  return component;
            },
            getAll() {
                  return entities;
            }
      };

      return component;
}

/**
 * hook responsible for component creation.
 * it will return a way to query the component
 * from system and a way to create it. Prototype can be assigned
 * as other ways to access the same component with different queries.
 * this is useful to implement inheritance into the component system
 * @template {{}} K
 * @template {unknown[]} X
 * @param {Component<unknown,unknown[]>[]} prototypes
 * @returns {Component<K, X>}
 */
export const createAbstractComponent = (...prototypes) => {
      /**
       * @type {K[]}
       */
      const entities = [];

      return { 
            prototypes,
            events: new EventManager(),
            create() {
                  throw new Error('abstract components cannot be instantiated')
            },
            attach(e, component) {
                  entities[e] = component;

                  for (let i = 0; i < prototypes.length; i++) {
                        prototypes[i].attach(e, entities[e]);
                  }

                  return entities[e];
            },
            get(e) {
                  return entities[e];
            },
            delete(e) {
                  const component = entities[e];
                  entities[e] = undefined;
                  return component;
            },
            getAll() {
                  return entities;
            }
      };
}