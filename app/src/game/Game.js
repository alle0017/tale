import { WorldManager } from "../ecs/WorldManager.js";
import Context from "../rendering/Context.js";
import Image from "../rendering/shader/lib/buffer/Image.js";
/**@import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js" */
/**@import GPUContext from "../rendering/index.js" */


export class Game {
      static #game = new Game();

      static get() {
            return Game.#game;
      }
      /**
       * @type {GPUContext}
       */
      #ctx;
      debug = false;

      /**
       * the camera used inside the scene.
       * every default entity is bound to this
       * camera.
       */
      get camera() {
            return this.#ctx.camera;
      }

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
      get ctx() {
            return this.#ctx;
      }
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
            this.#ctx = new Context();
      }

      /**
       * method used to preload all images 
       * that will be used inside the game
       * @param  {Record<string,string>} imgs 
       */
      async preload(imgs) {

            for (const[k,v] of Object.entries(imgs)) {
                  try {
                        await Image.preload(v, k);
                  } catch (e) {
                        console.error(e);
                  }
            }
      }
}

export const useGame = Game.get