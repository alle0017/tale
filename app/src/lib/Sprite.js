import { useGame } from "../game/Game.js"
import { createComponent } from "../ecs/Component.js";
/**@import {Position} from "./index.js" */

export const [sprite, useSprite] = createComponent('sprite', /**@param {string} asset*/asset => {
      const sprite = useGame().ctx.image();
      let ticket;

      sprite.image = asset;

      return {
            sprite,
            /**
             * bind the position component
             * to the sprite, so whenever the
             * position component changes the sprite
             * will follow it. Every position that 
             * was previously bind will be unbind
             * @param {Position} position 
             */
            bind(position) {
                  if (ticket) {
                        ticket();
                  }

                  ticket = position.onMove(pos => {
                        sprite.x = pos.x;
                        sprite.y = pos.y;
                  });
            },     
            /**
             * detach previously bound 
             * position.
             * @throws {Error} if no position was bound
             */
            unbind() {
                  if (!ticket) {
                        throw new Error('unbinding failed: position was not bound');
                  }
                  ticket();
                  ticket = undefined;
            }
      }
});