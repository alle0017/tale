import { useTaskManager, Priority } from "../ecs/TaskManager.js";
import { WorldManager } from "../ecs/WorldManager.js";
import { Drawable, } from "../lib/Drawable.js";
import Context from "./Context.js";
/**@import {Entity} from "../ecs/Entity.js" */



/**
 * create a rendering system that continues 
 * to draw entities onto the screen
 */
export const useRendering = (() => {
      /**
       * @type {Entity[]}
       */
      let entities = [];
      const ctx = new Context();
      const reload = () => {
            entities = WorldManager.current.entities.filter(e => e.has(Drawable));

            ctx.removeAll();

            for (const entity of entities) {
                  ctx.addEntity(entity.get(Drawable));
            }
      }
      const system = () => {
            ctx.clear();
            ctx.draw();
      };
      function render() {

            reload();

            WorldManager.current.onStateChange(() => {
                  reload();
            });

            WorldManager.current.addSystem(system, Priority.HIGH);

            useTaskManager().addAnimationTask(system);
      }
      render.CONTEXT = ctx;
      return render;
})();

