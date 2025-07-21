import { useTaskManager, Priority } from "../ecs/TaskManager.js";
import { sprite } from "../lib/Sprite.js";
import { WorldManager } from "../ecs/WorldManager.js";
import { useGame } from "../index.js";



/**
 * create a rendering system that continues 
 * to draw entities onto the screen
 */
export const useRendering = () => {
      const game = useGame();
      const system = () => {
            game.ctx.clear();
            game.ctx.draw();
      };
      let entities = WorldManager.current.entities.filter(sprite);

      game.ctx.removeAll();

      for (const entity of entities) {
            entity.sprite.draw(game.ctx);
      }

      WorldManager.current.onStateChange(() => {
            entities = WorldManager.current.entities.filter(sprite);
            game.ctx.removeAll();

            for (const entity of entities) {
                  entity.sprite.draw(game.ctx);
            }
      });

      WorldManager.current.addSystem(system, Priority.HIGH);

      useTaskManager().addAnimationTask(system);
};

