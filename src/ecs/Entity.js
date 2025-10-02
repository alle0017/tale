/**@import {Component,Query} from "./Component.js" */
import List from "../types/List.js";

/**
 * @typedef {{
 *    id: number,
 *    tags: List<string>,
 *    has(key: Component<unknown,unknown[]>): boolean,
 *    add: <X>(component: Component<X,unknown[]>, instance: X) => Entity,
 *    get: <X>(component: Component<X,unknown[]>) => X,
 *    remove: (component: Component<unknown, unknown[]>) => void,
 * }} Entity
 */

/**
 * function that creates an entity.
 * the entity must be added to the world to be queried, 
 * otherwise it will be **'invisible'** to systems
 * @return {Entity}
 */
export const createEntity = () => {
      const id = createEntity.id++;
      /**
       * @type {List<Component<unknown, unknown[]>>}
       */
      const components = new List();

      return {
            id,
            tags: new List(),
            add(component, instance) {
                  component.attach(id, instance);
                  components.push(component);
                  for (let i = 0; i < component.prototypes.length; i++) {
                        components.push(component.prototypes[i]);
                  }
                  return this;
            },
            get(component) {
                  return component.get(id);
            },
            remove(component) {
                  component.delete(id);
                  components.delete(component);
                  for (let i = 0; i < component.prototypes.length; i++) {
                        components.delete(component.prototypes[i]);
                  }
            },
            has(component) {
                  return Boolean(component.get(id));
            }
      }
};

createEntity.id = 0;