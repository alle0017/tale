import EventManager from "../ecs/Event.js";
/**@import ICanvas from "../rendering/rendering/canvas" */

/**
 * @typedef {{
 *    input(hook?: (key: string) => void): void;
 *    resize(hook?: (width: number, height: number) => void): void;
 *    canvas(width: number, height: number): ICanvas,
 * }} PlatformBackend
 */


const ProxyPlatform = {
      /**
       * @type {(key: string) => void}
       */
      _input: null,
      /**
       * @type {(width: number, height: number) => void}
       */
      _resize: null,

      canvas: () => null,
      /**
       * 
       * @param {(key: string) => void} hook 
       */
      input(hook) {
            this._input = hook;
      },
      /**
       * 
       * @param {(width: number, height: number) => void} hook 
       */
      resize(hook) {
            this._resize = hook;
      }
}

export default class Platform {
      /**@type {EventManager<'change'>} */
      static #events = new EventManager();
      /**
       * @type {PlatformBackend}
       */
      static #platform = ProxyPlatform;

      static get instance() {
            return this.#platform;
      }

      /**
       * 
       * @param {() => void} hook 
       */
      static onPlatformChange(hook) {
            this.#events.on('change', hook);
      }

      /**
       * 
       * @param {PlatformBackend} platform 
       */
      static use(platform) {
            this.#platform = platform;
            if (ProxyPlatform._input) {
                  platform.input(ProxyPlatform._input);
            }
            if (ProxyPlatform._resize) {
                  platform.resize(ProxyPlatform._resize);
            }
            this.#events.trigger('change');
      }
}