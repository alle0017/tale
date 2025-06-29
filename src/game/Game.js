import { useRendering } from "../rendering/Rendering.js";
/**@import {System} from "../components/index.js" */
/**@import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js" */
/**@import GPUContext from "../rendering/index.js" */


class Game {
      static #game = new Game();

      static get() {
            return Game.#game;
      }
      /**
       * @type {System<GPUEntity2D> & {ctx: GPUContext}}
       */
      #engine;

      /**
       * the camera used inside the scene.
       * every default entity is bound to this
       * camera.
       */
      get camera() {
            return this.#engine.ctx.camera;
      }

      /**
       * Context used to draw entities onto the canvas.
       * To render an entity, it must be created with the
       * context and then added to the {@link Game.engine}, like the example
       * below
       * @example
       * ```javascript
       * const game = useGame();
       * const img = game.ctx.image();
       * game.engine.add(img);
       * ```
       */
      get ctx() {
            return this.#engine.ctx;
      }

      /**
       * system that renders each entity onto the screen.
       * it works, under the hood, with {@link Game.ctx} 
       * to render every entity that was added
       */
      get engine() {
            return this.#engine;
      }

      /**
       * @private
       */
      constructor() {
            this.#engine = useRendering();
      }
}

export const useGame = Game.get