import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js";
import { createAbstractComponent, createComponent } from "../ecs/Component.js";
import { useGame } from "../game/Game.js";
/**@import {Query, Component} from "../ecs/Component.js";*/
/**
 * prototype to assign to any component
 * that should be queried by the renderer
 * @type {Component<GPUEntity2D,unknown[]>}
 */
export const Drawable = createAbstractComponent();
/**
 * @template {{}} K
 * @template {unknown[]} X
 * @param {(...params: X) => K} factory 
 * @param {Component<unknown, unknown[]>[]} prototypes
 * @returns {Component<K, X>}
 */
export const createDrawable = (factory, ...prototypes) => {
      const component = createComponent(factory, Drawable, ...prototypes);
      /*component.events.on('attached', () => {
            useGame().worlds.current.events.trigger('change');
      });
      component.events.on('removed', () => {
            useGame().worlds.current.events.trigger('change');
      });*/
      return component;
};