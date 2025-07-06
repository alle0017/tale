export function useBody(tag?: string[]): import("./lib/index.js").RigidBody;
export function useScene(): Scene;
import { useGame } from "./game/Game.js";
import { Game } from "./game/Game.js";
import Scene from "./game/Scene.js";
import SceneManager from "./game/SceneManager.js";
import { usePhysicsPosition } from "./lib/Position.js";
import { usePhysicsSystem } from "./lib/Physics.js";
import { useSprite } from "./lib/Sprite.js";
import { usePosition } from "./lib/Position.js";
import { useCollisionSystem } from "./lib/collisions/Collision.js";
import { useInput } from "./lib/input.js";
import createEntity from "./components/Entity.js";
import { createAnimationSystem } from "./components/index.js";
import { createSystem } from "./components/index.js";
export { useGame, Game, Scene, SceneManager, usePhysicsPosition, usePhysicsSystem, useSprite, usePosition, useCollisionSystem, useInput, createEntity, createAnimationSystem, createSystem };
//# sourceMappingURL=index.d.ts.map