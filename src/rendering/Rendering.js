import Context from "./Context.js";

export const useRendering = () => {
      const ctx = new Context();

      return createAnimationSystem(entity => {
            ctx.clear();
            
      });   
}

