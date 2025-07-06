import { useGame,Game } from "./game/Game.js";
import Scene from "./game/Scene.js";
import SceneManager from "./game/SceneManager.js";
import { usePhysicsSystem } from "./lib/Physics.js";
import { useSprite } from "./lib/Sprite.js";
import { usePosition, usePhysicsPosition } from "./lib/Position.js";
import { useCollisionSystem } from "./lib/collisions/Collision.js";
import { useInput } from "./lib/input.js";
import createEntity from "./components/Entity.js";
import { createAnimationSystem, createSystem } from "./components/index.js";

/**
 * @param {string[]} tag 
 * @returns {import("./lib/index.js").RigidBody}
 */
export const useBody = (tag = []) => {
      /**@type {Set<(body: import("./lib/index.js").RigidBody) => void>} */
      const subs = new Set();

      return {
            tag,
            x: 0,
            y: 0,
            width: 32,
            height: 32,
            onCollision: watcher => {
                  subs.add(watcher);

                  return () => subs.delete(watcher);
            },
            triggerCollision(body) {
                  for (const sub of subs) {
                        sub(body);
                  }
            }
      }
}

export {
      useGame,
      Game,
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

export const useScene = () => new Scene();