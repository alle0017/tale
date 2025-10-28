import { Area, } from "../../../src/index.js";
/**@import {HexColor} from "../../../src/rendering/rendering/canvas" */


/**
 * @typedef {{
 *    mapping: {
 *          idx: number,
 *          color: import("../../../src/rendering/rendering/canvas").HexColor
 *    }[],
 *    matrix: number[][]
 * }} Asset
 */
export const useActiveButton = () => {
      /**
       * @type {Area}
       */
      let active;
      /**
       * @param {Area} btn
       */
      return btn => {
            btn.border.color = '#54F';
      
            if (active && active !== btn) {
                  active.border.color = '#FFF';
            }
            active = btn;
      }
}

export const usePen = () => {
      /**
       * @type {HexColor}
       */
      let color = '#FFF';
      /**
       * @type {HexColor}
       */
      let penColor = color;
      let erase = false;

      return {
            erase: () => {
                  erase = true;
                  color = '#000';
            },
            write: (newColor = penColor) => {
                  erase = false;
                  penColor = newColor;
                  color = newColor;
            },
            isErasing: () => erase,
            getColor: () => {
                  return color;
            },
      }
}
/**
 * 
 * @param {number} w 
 * @param {number} h 
 */
export const useCanvasSupport = (w,h) => {
      /**
       * @type {HexColor[][]}
       */
      const result = [];
      for (let i = 0; i < h; i++) {
            result.push(new Array(w))
      }
      /**
       * @type {Map<HexColor, number>}
       */
      const colors = new Map();
      let colorIndex = 1;

      return {
            /**
             * 
             * @param {HexColor | undefined} color 
             * @param {number} x 
             * @param {number} y 
             */
            setPixel: (color, x, y) => {
                  colors.set(color, colorIndex);
                  colorIndex++;
                  
                  result[y][Math.trunc(x/2)] = undefined;
            },
            toAsset: () => {
                  /**
                   * @type {Asset}
                   */
                  const asset = {
                        mapping: [],
                        matrix: result.map(row => 
                              row.map(color => colors.get(color) || 0)
                        ),
                  };
                  colors.forEach((idx, color) => {
                        asset.mapping.push({
                              idx,
                              color,
                        });
                  });
                  return asset;
            }
      }
}