import { createAnimationSystem } from "../components/index.js";
import Context from "./Context.js";
import GPUEntity2D from "./shader/entity/GPUEntity2D.js";

export const useRendering = () => {
      const ctx = new Context();

      
      return createAnimationSystem((/**@type {GPUEntity2D[]}*/entities) => {
            ctx.clear();

            for (const en of entities) {
                  en.draw(ctx);
            }

            ctx.draw();
      });
}

