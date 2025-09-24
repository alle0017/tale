import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js";
/**@import {Query} from "../ecs/Component";*/
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