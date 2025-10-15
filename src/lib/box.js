import { Area } from "../rendering/shaders/area.js";
import { createDrawable, } from "./Drawable.js";
/**@import {Coordinates} from "./index.d.ts" */

/**
 * @returns {Area & { 
 *    bind(position: Position): void;
 *    unbind(): void; 
 * }}
 */
export const Box = createDrawable(() => {
      const area = new Area();
      let ticket;
      
      Object.defineProperties(area, {
            bind: {
                  /**
                   * bind the position component
                   * to the area, so whenever the
                   * position component changes the area
                   * will follow it. Every position that 
                   * was previously bind will be unbind
                   * @param {Coordinates} position 
                   */
                  value: (position) => {
                        if (ticket) {
                              ticket();
                        }

                        ticket = position.onMove(pos => {
                              area.x = pos.x;
                              area.y = pos.y;
                        });
                  },     
            },
            unbind: {
                  /**
                   * detach previously bound 
                   * position.
                   * @throws {Error} if no position was bound
                   */
                  value: () => {
                        if (!ticket) {
                              throw new Error('unbinding failed: position was not bound');
                        }
                        ticket();
                        ticket = undefined;
                  }
            }
      })

      return area
});