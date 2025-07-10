import { World } from "../ecs/World.js";
import { WorldManager } from "../ecs/WorldManager.js";
import { useRendering } from "../rendering/Rendering.js";

export const useScene = () => {
      const scene = new World();

      WorldManager.use(scene);
      
      useRendering();

      return scene;
}