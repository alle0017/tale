import { Border, } from "../../src/index.js";
import { Vertical, Horizontal, createRoot, Box, Button, Canvas } from "../../src/layout.js";
import { ColorPicker } from "../components/color-picker.js";
/**@import {HexColor} from "../../src/rendering/rendering/canvas" */


/**
 * @typedef {{
 *    mapping: {
 *          idx: number,
 *          color: import("../../src/rendering/rendering/canvas").HexColor
 *    }[],
 *    matrix: number[][]
 * }} Asset
 */

/**
 * 
 * @param {{ onSave?: (data: Asset) => void }} param0 
 * @returns 
 */
export default function Editor({ onSave }) {
      const CVS_WIDTH = 32;
      const CVS_HEIGHT = 32;
      /**
       * @type {HexColor}
       */
      let color = '#FFF';
      /**
       * @type {HexColor}
       */
      let penColor = color;
      let erase = false;
      /**
       * @type {HexColor[][]}
       */
      const result = [];

      for (let i = 0; i < CVS_HEIGHT; i++) {
            result.push(new Array(CVS_WIDTH))
      }
      const activeMarker = Box({ background: '#000', color: '#0FA'}, '◉');
      /**
       * @type {Map<HexColor, number>}
       */
      const colors = new Map();
      let colorIndex = 1;

      let active;

      const editor = Horizontal({},
            Canvas({
                  height: CVS_HEIGHT,
                  width: CVS_WIDTH*2,
                  onClick({ x, y }, cvs) {
                        cvs.setChar(x, y,'', '#000', color);
                        cvs.setChar(x%2 ? x - 1: x + 1, y,'', '#000', color);
                        colors.set(penColor, colorIndex);
                        colorIndex++;
                        
                        if (erase) {
                              result[y][Math.trunc(x/2)] = undefined;
                        } else {
                              result[y][Math.trunc(x/2)] = color;
                        }
                  }
            }),
            Vertical({gap: 5},
                  ColorPicker({ onClick: c => { 
                              color = c; 
                              penColor = c; 
                        } 
                  }),
                  Horizontal({ gap: 5 },
                        Button({ 
                              label: 'pen', 
                              width: 13, 
                              height: 2, 
                              border: Border.SolidRound, 
                              onClick: (_, btn) => {
                                    color = penColor;
                                    erase = false;
                                    btn.border.label = activeMarker;

                                    if (active && active !== btn) {
                                          active.border.label = undefined;
                                    }
                                    active = btn;
                              },
                        }),
                        Button({ 
                              label: 'erase', 
                              width: 13, 
                              height: 2, 
                              border: Border.SolidRound,
                              onClick: (ev, btn) => {
                                    color = '#000';
                                    erase = true;
                                    btn.border.label = activeMarker;

                                    if (active && active !== btn) {
                                          active.border.label = undefined;
                                    }
                                    active = btn;
                              } 
                        }),
                  ),
                  Horizontal({ gap: 5 },
                        Button({ 
                              label: 'save', 
                              width: 13, 
                              height: 2, 
                              border: Border.SolidRound, 
                              onClick: (e) => {
                                    if (e.released) {
                                          return;
                                    }
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
                                    onSave?.(asset);
                              },
                        }),
                  )
            )
      );

      return editor;
}