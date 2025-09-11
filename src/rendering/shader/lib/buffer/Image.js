import EventManager from "../../../../ecs/Event.js";

export default (() => {
      /**
       * @type {Map<string,HTMLImageElement>}
       */
      const cache = new Map();
      /**
       * @type {Map<string, HTMLImageElement>}
       */
      const aborted = new Map();

      return {
            /**
             * @type {EventManager<'load'|'abort'>}
             */
            events: new EventManager(),
            /**
             * @param {string} img
             * @param {string} name 
             */
            preload(img, name) {
                  const image = new Image();
                  const promise = new Promise((resolve,reject) => {
                        image.addEventListener('load', () => {
                              cache.set(name, image);
                              this.events.trigger('load');
                              resolve();
                        });
                        image.addEventListener('error', (err) => {
                              aborted.set(name, image);
                              console.error('Image failed to load:', img, err);
                              reject(new Error('failed to load image'));
                        });
                  });   

                  image.src = img;

                  return promise;
            },
            /**
             * @param {string} img
             */
            get(img) {
                  if (!cache.has(img)) {
                        throw new Error("[ImageCache] you must call `preload` function ahead of time, to load your textures.");
                  }
                  return cache.get(img);
            },
            getAllLoaded() {
                  return cache;
            },
            getAllAborted() {
                  return aborted;
            }
      }
})()