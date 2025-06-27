export const loadImage = (() => {
      /**
       * @type {Map<string,HTMLImageElement>}
       */
      const cache = new Map;

      /**
       * @param {string} img
       * @returns {Promise<HTMLImageElement>}
       */
      return async img => {

            return new Promise((resolve, reject) => {
                  if (cache.has(img)) {
                        resolve(cache.get(img));
                  }

                  const image = new Image();

                  image.src = img;

                  image.addEventListener('load', () => {
                        cache.set(img, image);
                        resolve(image);
                  });    
            });
      }
})();