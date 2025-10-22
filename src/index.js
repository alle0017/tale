import { useGame,Game } from "./game/Game.js";
import { Sprite, } from "./lib/Sprite.js";
import { Position } from "./lib/Position.js";
import { useInput } from "./lib/input.js";
import { Body, useCollisionSystem } from "./lib/collisions/Collision.js";
import { createEntity } from "./ecs/Entity.js";
import { useSystem } from "./ecs/System.js";
import { World } from "./ecs/World.js";
import { WorldManager } from "./ecs/WorldManager.js";
import { useTaskManager } from "./ecs/TaskManager.js";
import { useRendering } from "./rendering/Rendering.js";
import { usePhysicsSystem, Physics} from "./lib/Physics.js";
import { createComponent } from "./ecs/Component.js";
import FrameWrapper from "./lib/frame-wrapper.js";
import { Box } from "./lib/box.js";
import { Layout } from "./lib/layout.js";
import { Area } from "./rendering/shaders/area.js";
import { Border } from "./rendering/shaders/border.js";
import { BorderComponent } from "./rendering/shaders/border-component.js";
import { Parent } from "./rendering/shaders/layout/parent.js";
import { Vertical } from "./rendering/shaders/layout/vertical.js";
import { Action as MouseAction } from "./lib/platform/mouse.js";

export {
      useGame,
      Game,
      useSystem,
      Physics,
      usePhysicsSystem,
      Sprite,
      Position,
      useCollisionSystem,
      useInput,
      createEntity,
      World,
      WorldManager,
      Body,
      useTaskManager,
      useRendering,
      createComponent,
      Box,
      FrameWrapper,
      Layout,
      Area,
      Border,
      Parent,
      Vertical,
      BorderComponent,
      MouseAction,
}

export const useWorld = () => {
      const world = new World();
      
      WorldManager.use(world);
      
      useRendering();

      return world;
}