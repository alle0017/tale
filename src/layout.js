import { Vertical } from "./layout/vertical.js";
import { Horizontal } from "./layout/horizontal.js";
import { Box } from "./layout/box.js";
import { World } from "./ecs/World.js";
import { createEntity } from "./ecs/Entity.js";
import { Layout } from "./lib/layout.js";
/**@import { Area } from "./rendering/shaders/area.js";*/

/**
 * @param {Area} parent 
 * @param {World} scene 
 */
export function createRoot(parent, scene) {
      const box = Layout.create(parent);
      const entity = createEntity().add(box);
      scene.add(entity);
      return entity;
}

export { Vertical, Horizontal, Box };