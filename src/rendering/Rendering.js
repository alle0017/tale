import { useTaskManager, Priority } from "../ecs/TaskManager.js";
import { WorldManager } from "../ecs/WorldManager.js";
import { useGame } from "../index.js";
import { drawable } from "../lib/Drawable.js";
import GPUEntity2D from "./shader/entity/GPUEntity2D.js";
/**@import {Entity} from "../ecs/Entity.js" */



/**
 * create a rendering system that continues 
 * to draw entities onto the screen
 */
export const useRendering = () => {
      const game = useGame();
      const reload = () => {
            entities = WorldManager.current.entities.filter(drawable);

            game.ctx.removeAll();

            for (const entity of entities) {
                  entity.drawable.draw(game.ctx);
            }
      }
      const system = () => {
            game.ctx.clear();
            game.ctx.draw();
      };
      /**
       * @type {Entity<{ drawable: GPUEntity2D }>[]}
       */
      let entities = [];

      reload();

      WorldManager.current.onStateChange(() => {
            reload();
      });

      WorldManager.current.addSystem(system, Priority.HIGH);

      useTaskManager().addAnimationTask(system);
};

