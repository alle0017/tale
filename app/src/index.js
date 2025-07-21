import { useGame,Game } from "./game/Game.js";
import { useSprite, sprite } from "./lib/Sprite.js";
import { position, usePosition, } from "./lib/Position.js";
import { useInput } from "./lib/input.js";
import { useBody, body, useCollisionSystem } from "./lib/collisions/Collision.js";
import { createEntity } from "./ecs/Entity.js";
import { useSystem } from "./ecs/System.js";
import { World } from "./ecs/World.js";
import { WorldManager } from "./ecs/WorldManager.js";
import { useTaskManager } from "./ecs/TaskManager.js";
import { useRendering } from "./rendering/Rendering.js";
import { usePhysicsSystem, usePhysics, physics } from "./lib/Physics.js";
import { createComponent } from "./ecs/Component.js";

export const Query = {
      sprite,
      position,
      body,
      physics,
};

export {
      useGame,
      Game,
      useSystem,
      usePhysics,
      usePhysicsSystem,
      useSprite,
      usePosition,
      useCollisionSystem,
      useInput,
      createEntity,
      World,
      WorldManager,
      useBody,
      useTaskManager,
      useRendering,
      createComponent
}

export const useWorld = () => {
      const world = new World();
      
      WorldManager.use(world);
      
      useRendering();

      return world;
}