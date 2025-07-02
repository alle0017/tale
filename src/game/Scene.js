import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js";
import { Game, useGame } from "./Game.js";
/**@import {Entity} from "../components/Entity"*/
/**@import {System} from "../components/index.js" */

export default class Scene {
      /**
       * @type {Game}
       * @readonly
       */
      #game;
      /**
       * @type {Set<Entity<unknown>>}
       */
      #entities = new Set();
      /**
       * @type {Set<System<unknown>>}
       */
      #systems = new Set();

      /**
       * @type {GPUEntity2D[]}
       */
      #drawable;
      /**@type {Set<() => void>} */
      #onResume = new Set();
      /**@type {Set<() => void>} */
      #onStop = new Set();
      /**@type {Set<() => void>} */
      #onClear = new Set();

      constructor() {
            this.#game = useGame();
      }

      /**
       * add an entity to the scene.
       * @param {Entity<unknown>} entity 
       */
      add(entity) {
            this.#entities.add(entity);

            if ('sprite' in entity && entity.sprite instanceof GPUEntity2D) {
                  this.#game.engine.add(entity.sprite);
            }
      }

      /**
       * add system to the scene. If the scene
       * is stopped and later resumed, all systems
       * are restarted
       * @param {System<unknown>} system 
       */
      use(system) {
            this.#systems.add(system);
      }
      /**
       * stop the current scene and remove all
       * drawn entities from the screen. The entities are
       * preserved for later reuse, in case the scene will be
       * resumed with {@link Scene.resume()}
       */
      stop() {
            this.#drawable = this.#game.ctx.entities;
            this.#game.ctx.removeAll();

            for (const system of this.#systems) {
                  system.stop();
            }

            for (const stopper of this.#onStop) {
                  stopper();
            }
      }
      /**
       * resume all the systems that where 
       * registered and add all {@link GPUEntity2D}
       * that where drawn when the scene was
       * removed
       */
      resume() {
            for (const drawable of this.#drawable) {
                  drawable.draw(this.#game.ctx);
            }

            for (const system of this.#systems) {
                  system.resume();
            }

            for (const resumer of this.#onResume) {
                  resumer();
            }
      }
      /**
       * remove all entities from the screen and
       * stop al the systems available.
       * if the scene is resumed, nothing will be preserved
       */
      clear() {
            this.#game.ctx.removeAll();

            for (const system of this.#systems) {
                  system.dispose();
            }

            for (const cleaner of this.#onClear) {
                  cleaner();
            }
      }
      /**
       * @param {() => void} callback
       */
      onResume(callback) {
            this.#onResume.add(callback);
            return () => this.#onResume.delete(callback);
      }
      /**
       * @param {() => void} callback
       */
      onStop(callback) {
            this.#onStop.add(callback);
            return () => this.#onStop.delete(callback);
      }
      /**
       * @param {() => void} callback
       */
      onClear(callback) {
            this.#onClear.add(callback);
            return () => this.#onClear.delete(callback);
      }
}