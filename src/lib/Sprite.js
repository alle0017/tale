import { useGame } from "../game/Game.js"
/**@import {Position} from "./index.js" */

/**
 * sprite component used to 
 * draw entities onto the screen
 * @param {string} asset 
 */
export const useSprite = asset => {
      const game = useGame();
      const sprite = game.ctx.image();
      let ticket;

      sprite.image = asset;
      game.engine.add(sprite);
      
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
            },
            /**
             * stop rendering the sprite onto
             * the screen
             */
            hide() {
                  game.engine.delete(sprite);
            },
            /**
             * start rendering the sprite onto the
             * screen
             */
            show() {
                  game.engine.add(sprite);
            },
      }
}