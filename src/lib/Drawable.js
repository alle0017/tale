import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js";
import { createComponent } from "../ecs/Component.js";
import { useGame } from "../game/Game.js";
/**@import {Query, Component} from "../ecs/Component";*/
/**
 * prototype to assign to any component
 * that should be queried by the renderer
 */
export const DrawablePrototype = 'drawable';
/**
 * query to collect every element that extends the {@link DrawablePrototype}.
 * use it to create new components that can be rendered in Renderer. state of the component
 * must extend {@link GPUEntity2D} to work correctly.
 * @type {Query<'drawable', GPUEntity2D>}
 */
export const drawable = e => e.has(DrawablePrototype) && (e.getAll().get(DrawablePrototype).state instanceof GPUEntity2D);
/**
 * @template {string} T
 * @template {{}} K
 * @template {unknown[]} X
 * @param {T} key
 * @param {(...params: X) => K} factory 
 * @param {string[]} prototypes
 * @returns {[Query<T,K>, (...args: X) => Component<T,K>]}
 */
export const createDrawable = (key, factory, ...prototypes) => {
      const [query, builder] = createComponent(key, factory, DrawablePrototype, ...prototypes);

      return [
            query,
            /**
             * 
             * @param  {X} args 
             * @returns {Component<T,K>}
             */
            (...args) => {
                  const comp = builder(...args);

                  comp.events.on('attached', () => {
                        useGame().worlds.current.events.trigger('change');
                  });
                  comp.events.on('removed', () => {
                        useGame().worlds.current.events.trigger('change');
                  });
                  return comp;
            }
      ]
};