import { useGame } from "../game/Game.js"
import { createComponent } from "../ecs/Component.js";
import TextureEntity from "../rendering/shader/entity/Texture.js";
import { DrawablePrototype } from "./Drawable.js";
/**@import {Position} from "./index.js" */

/**
 * @returns {TextureEntity & { 
 *    bind(position: Position): void;
 *    unbind(): void; 
 * }}
 */
export const [rect, useRect] = createComponent('rect', 
      /**
       * 
       * @param {number} width 
       * @param {number} height 
       * @returns 
       */
      (width = 10, height = 10) => {
      const rect = useGame().ctx.rect();
      let ticket;

      rect.scaleX = width;
      rect.scaleY = height;

      Object.defineProperties(rect, {
            bind: {
                  /**
                   * bind the position component
                   * to the rect, so whenever the
                   * position component changes the rect
                   * will follow it. Every position that 
                   * was previously bind will be unbind
                   * @param {Position} position 
                   */
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

      return rect;
}, DrawablePrototype);