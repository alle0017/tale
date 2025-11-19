import { createAbstractComponent, createComponent } from "../ecs/Component.js";
import { Position } from "./Position.js";
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
      const component = createComponent(factory, Drawable, Position, ...prototypes);
      Drawable.name = 'DrawableComponent';
      return component;
};