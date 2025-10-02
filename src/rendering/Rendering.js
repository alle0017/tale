import { useTaskManager, Priority } from "../ecs/TaskManager.js";
import { WorldManager } from "../ecs/WorldManager.js";
import { useGame } from "../index.js";
import { Drawable, } from "../lib/Drawable.js";
import GPUEntity2D from "./shader/entity/GPUEntity2D.js";
/**@import {Entity} from "../ecs/Entity.js" */



/**
 * create a rendering system that continues 
 * to draw entities onto the screen
 */
export const useRendering = () => {
      const game = useGame();
      const reload = () => {
            entities = WorldManager.current.entities.filter(e => e.has(Drawable));

            game.ctx.removeAll();

            for (const entity of entities) {
                  entity.get(Drawable).draw(game.ctx);
            }
      }
      const system = () => {
            game.ctx.clear();
            game.ctx.draw();
      };
      /**
       * @type {Entity[]}
       */
      let entities = [];

      reload();

      WorldManager.current.onStateChange(() => {
            reload();
      });

      WorldManager.current.addSystem(system, Priority.HIGH);

      useTaskManager().addAnimationTask(system);
};

