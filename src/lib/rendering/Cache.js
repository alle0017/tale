export default class Cache {
      /**@type {Map<string,HTMLImageElement>} */
      #cache = new Map();

      /**
       * 
       * @param {string} path
       */
      load(path) {

            if (this.#cache.has(path)) {
                  return this.#cache.get(path);
            }

            const img = new Image();

            img.src = path;
            this.#cache.set(path, img);

            return img;
      }
}