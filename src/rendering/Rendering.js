import { useAnimationSystem } from "../ecs/System.js";
import { Drawable, } from "../lib/Drawable.js";
import Context from "./Context.js";
/**@import {Entity} from "../ecs/Entity.js" */
import { events } from "../ecs/scene.js";



/**
 * create a rendering system that continues 
 * to draw entities onto the screen
 */

export function useRendering() {
      const ctx = useRendering.CONTEXT;
      let dirty = true;

      events.on('change', () => (dirty = true));

      useAnimationSystem(entities => {
            if (dirty) {
                  ctx.removeAll();
      
                  for (let i = 0; i < entities.length; i++) {
                        ctx.addEntity(entities[i].get(Drawable));
                  }
                  dirty = false;
            }
            ctx.clear();
            ctx.draw();
      }, Drawable);
}

/**
 * @type {Context}
 */
useRendering.CONTEXT = useRendering.CONTEXT ? useRendering.CONTEXT: new Context();