import Scene from "./Scene";

export default class SceneManager {
      /**
       * if the current scene is resumable
       * @type {boolean}
       */
      #toResume;
      /**
       * @type {Scene}
       */
      #current;
      /**
       * @type {Map<() => Scene,Scene>}
       */
      #resumable = new Map();

      get current() {
            return this.#current;
      }

      /**
       * @param {() => Scene} scene - scene builder. 
       * @param {boolean} [resumable=true] - tells to the manager if the 
       * scene could be later resumed instead of being recreated. this is useful 
       * for stateful scenes like when you stop the game to open a menu and later
       * on resume it.
       * ## note
       * ---
       * is important the reuse of same builder,
       * because if you change it, like this `manager.use(() => MyScene())`
       * the manager couldn't tell if the scene was already created and must 
       * be resumed, so it creates new one instead.
       */
      use(scene, resumable = true) {

            this.#current.stop();

            if (!this.#toResume) {
                  this.#current.clear();
            }

            this.#toResume = resumable;

            if (resumable && this.#resumable.has(scene)) {
                  this.#current = this.#resumable.get(scene);
                  this.#current.resume();
                  return;
            }

            this.#current = scene();
      }
}
