import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js";
import { createAbstractComponent, createComponent } from "../ecs/Component.js";
import { useGame } from "../game/Game.js";
/**@import { Shader } from "../rendering/shaders/shader.js";*/
/**@import {Query, Component} from "../ecs/Component.js";*/
/**
 * prototype to assign to any component
 * that should be queried by the renderer
 * @type {Component<Shader,unknown[]>}
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
      return component;
};