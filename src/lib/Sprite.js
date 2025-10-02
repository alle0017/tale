import { useGame } from "../game/Game.js"
import { createDrawable, } from "./Drawable.js";
/**@import {Coordinates} from "./index.js" */

/**
 * @returns {TextureEntity & { 
 *    bind(position: Position): void;
 *    unbind(): void; 
 * }}
 */
export const Sprite = createDrawable(/**@param {string} asset*/asset => {
      const sprite = useGame().ctx.image();
      let ticket;

      sprite.image = asset;
      Object.defineProperties(sprite, {
            bind: {
                  /**
                   * bind the position component
                   * to the sprite, so whenever the
                   * position component changes the sprite
                   * will follow it. Every position that 
                   * was previously bind will be unbind
                   * @param {Coordinates} position 
                   */
                  value: (position) => {
                        if (ticket) {
                              ticket();
                        }

                        ticket = position.onMove(pos => {
                              sprite.x = pos.x;
                              sprite.y = pos.y;
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

      return sprite
});