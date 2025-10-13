import { useGame } from "../game/Game.js"
import { createDrawable } from "./Drawable.js";
/**@import {Coordinates} from "./index.d.ts" */

/**
 * @returns {TextureEntity & { 
 *    bind(position: Coordinates): void;
 *    unbind(): void; 
 * }}
 */
export const Rect = createDrawable( () => ({})
      /**
       * 
       * @param {number} width 
       * @param {number} height 
       * @returns 
       *
      (width = 10, height = 10) => {
      const rect = useGame().ctx.rect();
      let ticket;

      rect.width= width;
      rect.height = height;

      Object.defineProperties(rect, {
            bind: {
                  /**
                   * bind the position component
                   * to the rect, so whenever the
                   * position component changes the rect
                   * will follow it. Every position that 
                   * was previously bind will be unbind
                   * @param {Coordinates} position 
                   *
                  value: (position) => {
                        if (ticket) {
                              ticket();
                        }

                        ticket = position.onMove(pos => {
                              rect.x = pos.x;
                              rect.y = pos.y;
                        });
                  },     
            },
            unbind: {
                  /**
                   * detach previously bound 
                   * position.
                   * @throws {Error} if no position was bound
                   *
                  value: () => {
                        if (!ticket) {
                              throw new Error('unbinding failed: position was not bound');
                        }
                        ticket();
                        ticket = undefined;
                  }
            }
      })

      return rect;*/
);