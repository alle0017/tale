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

      sprite.image = asset;
      game.engine.add(sprite);
      
      return {
            sprite,
            /**
             * bind the position component
             * to the sprite, so whenever the
             * position component changes the sprite
             * will follow it
             * @param {Position} position 
             */
            bind(position) {
                  position.onMove(pos => {
                        sprite.x = pos.x;
                        sprite.y = pos.y;
                  });
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