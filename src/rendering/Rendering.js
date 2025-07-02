import { useTaskManager } from "../components/TaskManager.js";
import Context from "./Context.js";
import GPUEntity2D from "./shader/entity/GPUEntity2D.js";
/**@import GPUContext from "./index.js" */
/**@import { System } from "../components/index.js";*/

/**
 * create a rendering system, used
 * to draw multiple entities onto the
 * screen. It uses dirty checking for better performances
 * @returns {System<GPUEntity2D> & {ctx: GPUContext}}
 */
export const useRendering = () => {
      const manager = useTaskManager();
      const ctx = new Context();
      const task = () => {
            ctx.clear();
            ctx.draw();
      };

      let dispose = manager.addAnimationTask(task);

      return {
            ctx,
            /**
             * @param {GPUEntity2D} entity 
             */
            add(entity) {
                  entity.draw(ctx);
            },
            /**
             * @param {GPUEntity2D} entity 
             */
            delete(entity) {
                  entity.remove(ctx);
            },

            dispose() {
                  dispose();
                  ctx.removeAll();
            },
            stop() {
                  dispose();
            },
            resume() {
                  dispose = manager.addAnimationTask(task);
            }
      }
}

