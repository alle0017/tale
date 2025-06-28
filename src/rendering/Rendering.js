import { createAnimationSystem } from "../components/index.js";
import Context from "./Context.js";
import GPUEntity2D from "./shader/entity/GPUEntity2D.js";

export const useRendering = () => {
      const ctx = new Context();

      return createAnimationSystem(
      /**
       * @param {GPUEntity2D[]} entities 
       * @param {boolean} isDirty 
       */
      (entities, isDirty) => {
            if (!isDirty) {
                  return;
            }
            
            ctx.clear();

            for (const en of entities) {
                  en.draw(ctx);
            }

            ctx.draw();
      });
}

