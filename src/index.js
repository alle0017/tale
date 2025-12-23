import { Sprite, } from "./lib/Sprite.js";
import { Position } from "./lib/Position.js";
import { useInput } from "./lib/input.js";
import { Body, useCollisionSystem } from "./lib/collisions/Collision.js";
import { createEntity } from "./ecs/Entity.js";
import { useSystem } from "./ecs/System.js";
import { useTaskManager } from "./ecs/TaskManager.js";
import { useRendering } from "./rendering/Rendering.js";
import { usePhysicsSystem, Physics} from "./lib/Physics.js";
import { createComponent } from "./ecs/Component.js";
import { Action as MouseAction } from "./lib/mouse.js";
import { Camera } from "./rendering/shaders/camera.js";
import { Shader } from "./lib/shader.js";
import { rgb } from "./rendering/rendering/canvas.js";
import { setScene, createScene, addEntity, getScene } from "./ecs/scene.js";

export {
      useSystem,
      Physics,
      usePhysicsSystem,
      Sprite,
      Position,
      useCollisionSystem,
      useInput,
      createEntity,
      Body,
      useTaskManager,
      useRendering,
      createComponent,
      MouseAction,
      Camera,
      Shader,
      rgb,
      setScene,
      createScene,
      addEntity,
      getScene,
}
