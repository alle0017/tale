/**
 * @typedef {{
 *    color: import("../rendering/grid.js").HexColor, 
 *    primitive?: string
 * }} AbstractPixel
 */
export default class PixelResolver {
      /**
       * @type {PixelResolver}
       */
      static #instance;
      static get() {
            if (!this.#instance) {
                  this.#instance = new PixelResolver();
            }
            return this.#instance;
      }
      /**
       * @type {Map<string,AbstractPixel>}
       */
      #mapping = new Map();
      /**
       * 
       * @param {string} symbol 
       */
      deleteMapping(symbol) {
            this.#mapping.delete(symbol);
      }
      /**
       * 
       * @param {string} symbol 
       * @param {import("../rendering/grid.js").HexColor} color 
       * @param {string | undefined} primitive
       */
      createMapping(symbol, color, primitive = undefined) {
            this.#mapping.set(symbol, { color, primitive });
      }
      /**
       * 
       * @param {string} template 
       */
      resolve(template) {
            const rows = template.replaceAll(' ', '').split('\n');
            const matrix = [];

            for (let i = 0; i < rows.length; i++) {
                  /**
                   * @type {import("../pipe/pipe.js").Pixel[]}
                   */
                  const row = [];
                  for (let j = 0; j < rows[i].length; j++) {
                        const pixel = this.#mapping.get(rows[i][j]);
                        if (pixel) {
                              row.push({ 
                                    ...pixel, 
                                    x: j, 
                                    y: i, 
                                    z: 1 
                              });
                        } else {
                              row.push({ 
                                    color: '#FFF',
                                    x: j, 
                                    y: i, 
                                    z: 1 
                              });
                        }
                  }
                  matrix.push(row);
            }
            return matrix;
      }
      /**
       * @param {TemplateStringsArray} template
       * @param {...unknown} params 
       */
      image(template, ...params) {
            let res = '';
            for (let i = 0; i < template.length; i++) {
                  res += template[i] + (i < params.length ? params[i]: '');
            }
            return this.resolve(res);
      }
}