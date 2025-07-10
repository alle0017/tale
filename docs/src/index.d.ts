export namespace Query {
    export { sprite };
    export { position };
    export { body };
    export { physics };
}
export function useWorld(): World;
import { sprite } from "./lib/Sprite.js";
import { position } from "./lib/Position.js";
import { body } from "./lib/collisions/Collision.js";
import { physics } from "./lib/Physics.js";
import { useGame } from "./game/Game.js";
import { Game } from "./game/Game.js";
import { useSystem } from "./ecs/System.js";
import { usePhysics } from "./lib/Physics.js";
import { usePhysicsSystem } from "./lib/Physics.js";
import { useSprite } from "./lib/Sprite.js";
import { usePosition } from "./lib/Position.js";
import { useCollisionSystem } from "./lib/collisions/Collision.js";
import { useInput } from "./lib/input.js";
import { createEntity } from "./ecs/Entity.js";
import { World } from "./ecs/World.js";
import { WorldManager } from "./ecs/WorldManager.js";
import { useBody } from "./lib/collisions/Collision.js";
import { useTaskManager } from "./ecs/TaskManager.js";
import { useRendering } from "./rendering/Rendering.js";
export { useGame, Game, useSystem, usePhysics, usePhysicsSystem, useSprite, usePosition, useCollisionSystem, useInput, createEntity, World, WorldManager, useBody, useTaskManager, useRendering };
//# sourceMappingURL=index.d.ts.map