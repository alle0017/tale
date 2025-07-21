export default (() => {
      /**
       * @type {Map<string,HTMLImageElement>}
       */
      const cache = new Map();

      return {
            /**
             * @param {string} img
             * @param {string} name 
             */
            preload(img, name) {
                  const image = new Image();

                  image.src = img;

                  return new Promise((resolve) => {
                        image.addEventListener('load', () => {
                              cache.set(name, image);
                              resolve();
                        });   
                  });
            },
            /**
             * @param {string} img
             */
            get(img) {
                  if (!cache.has(img)) {
                        throw new Error("[ImageCache] you must call `preload` function ahead of time, to load your textures.");
                  }
                  return cache.get(img);
            }
      }
})()