import type { Game } from "./game/Game";
import Scene from "./game/Scene";
import SceneManager from "./game/SceneManager";
import { useCollisionSystem } from "./lib/collisions/Collision";
import { useInput } from "./lib/input";
import { usePhysicsSystem } from "./lib/Physics";
import { usePosition, usePhysicsPosition } from "./lib/Position";
import { useSprite } from "./lib/Sprite";
import { createAnimationSystem, createEntity, createSystem } from "./components";
import type { RigidBody } from "./lib/index.js";


/**
 * hook that is used to retrieve 
 * global instance of `Game`. 
 * It could be used to change scene 
 * dynamically
 */
export declare const useGame: () => Game;
/**
 * create new scene and retrieve its reference
 */
export declare const useScene: () => Scene;
/**
 * hook that can be used to create a rigid 
 * body component. tag can be used to check 
 * type of collisions
 */
export declare const useBody: (tag?: string[]) => RigidBody
export {
      type RigidBody,
      type Game,
      Scene,
      SceneManager,
      usePhysicsPosition,
      usePhysicsSystem,
      useSprite,
      usePosition,
      useCollisionSystem,
      useInput,
      createEntity,
      createAnimationSystem,
      createSystem,
}
