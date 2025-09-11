import EventManager from "../../../../ecs/Event.js";

export default (() => {
      /**
       * @type {Map<string,HTMLImageElement>}
       */
      const cache = new Map();

      return {
            /**
             * @type {EventManager<'load'>}
             */
            events: new EventManager(),
            /**
             * @param {string} img
             * @param {string} name 
             */
            preload(img, name) {
                  const image = new Image();
                  const promise = new Promise((resolve) => {
                        image.addEventListener('load', () => {
                              cache.set(name, image);
                              this.events.trigger('load');
                              resolve();
                        });   
                  });
                  image.addEventListener('error', (err) => {
                        console.error('Image failed to load:', img, err);
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
                  return [...cache.keys()]
            }
      }
})()