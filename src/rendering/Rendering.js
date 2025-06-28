import { createAnimationSystem } from "../components/index.js";
import Context from "./Context.js";
import GPUEntity2D from "./shader/entity/GPUEntity2D.js";
/**@import GPUContext from "./index.js" */
/**@import { System } from "../components/index.js";*/


/**
 * 
 * @returns {[GPUContext, System<GPUEntity2D>]}
 */
export const useRendering = () => {
      const ctx = new Context();

      return [
            ctx,
            createAnimationSystem((entities, isDirty) => {
                  if (!isDirty) {
                        return;
                  }
                  
                  ctx.clear();

                  for (const en of entities) {
                        en.draw(ctx);
                  }

                  ctx.draw();
            })
      ];
}

