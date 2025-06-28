import GPUEntity2D from "./GPUEntity2D.js";

export default class TextureEntity extends GPUEntity2D {
      /**
       * @type {string}
       */
      image;

      get indices() {
            return [
                  0, 1, 2,
                  0, 2, 3,
            ];
      }
}