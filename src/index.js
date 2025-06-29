import { useGame,Game } from "./game/Game.js";
import Scene from "./game/Scene.js";
import SceneManager from "./game/SceneManager.js";
import { usePhysicsSystem } from "./lib/Physics.js";
import { useSprite } from "./lib/Sprite.js";
import { usePosition, usePhysicsPosition } from "./lib/Position.js";

export {
      useGame,
      Game,
      Scene,
      SceneManager,
      usePhysicsPosition,
      usePhysicsSystem,
      useSprite,
      usePosition,
}

export const useScene = () => new Scene();