import { Vertical } from "./layout/vertical.js";
import { Horizontal } from "./layout/horizontal.js";
import { Box, Text } from "./layout/box.js";
import { createEntity } from "./ecs/Entity.js";
import { Layout } from "./lib/layout.js";
import { Button } from "./layout/button.js";
import { Canvas } from "./layout/canvas.js";
import { createComponent, useRef } from "./layout/component.js";
import { addEntity } from "./ecs/scene.js";
/**@import { Area } from "./rendering/shaders/area.js";*/

/**
 * @param {Area} parent 
 */
export function createRoot(parent) {
      const box = Layout.create(parent);
      const entity = createEntity().add(box);
      entity.tags.push('window');
      entity.tags.push('ui');
      addEntity(entity);
      return entity;
}

export { Vertical, Horizontal, Box, Button, Canvas, Text, createComponent, useRef };