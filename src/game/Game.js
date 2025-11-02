import { WorldManager } from "../ecs/WorldManager.js";


export class Game {
      /**
       * @type {Game}
       */
      static #game;
      static get() {
            if (!Game.#game) {
                  Game.#game = new Game();
            }
            return Game.#game;
      }

      debug = false;
      /**
       * Context used to draw entities onto the canvas.
       * To render an entity, it must be created with the
       * context and then drawn using standard Context api. 
       * this is simplified by the `useSprite` hook. if 
       * you want more control, you have to do something like 
       * this
       * @example
       * ```javascript
       * const game = useGame();
       * const img = game.ctx.image();
       * img.draw(game.ctx);
       * const f = () => {
       *    game.ctx.clear();
       *    game.ctx.draw();
       *    requestAnimationFrame(f);
       * }
       * f();
       * ```
       */
      /**
       * scene manager useful to transit across Worlds 
       * and preserve their state
       */
      get worlds() {
            return WorldManager;
      }

      /**
       * @private
       */
      constructor() {
      }
}

export const useGame = Game.get