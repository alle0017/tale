/**@import {HexColor} from "../../src/rendering/rendering/canvas" */

import { useInput } from "../../src/index.js";
import { Vertical, Horizontal, Box } from "../../src/layout.js";
import { Action } from "../../src/lib/platform/mouse.js";
/**
 * 
 * @param {number} idx 
 * @returns 
 */
function getHexComponent(idx) {
      return [
            '0', 
            '1', 
            '2', 
            '3', 
            '4', 
            '5', 
            '6', 
            '7', 
            '8', 
            '9', 
            'A', 
            'B', 
            'C', 
            'D', 
            'E', 
            'F'
      ][idx >= 16 ? 15: idx < 0? 0: idx];
}
/**
 * 
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @returns {HexColor}
*/
//@ts-ignore
const getHex = (r,g,b) => `#${getHexComponent(r)}${getHexComponent(g)}${getHexComponent(b)}`

/**
 * 
 * @param {number} base 
 * @param {number} max 
 * @param {number} len
 */
function buildRowShade(base, max, len) {
      /**
       * @type {HexColor[]}
       */
      const shade = [];
      const greenShadeLen = Math.trunc(len/2 - 1);
      const blueShadeLen = Math.trunc(len/2 - 1);

      let r = max;
      let g =  Math.trunc(r/2);
      let b = base;

      shade.push(getHex(r, 0, 0));

      for (let i = 0; i < greenShadeLen; i++) {
            shade.push(getHex(r,g,b));
            g++;
      }
      
      shade.push(getHex(0, g, 0));

      r = base;
      g = max;
      b = Math.trunc(g/2);

      for (let i = 0; i < blueShadeLen; i++) {
            shade.push(getHex(r,g,b));
            b++;
      }
      return shade;
}
/**
 * @returns {HexColor[][]}
 */
function getColorGradient() {
      /**
       * @type {HexColor[][]}
       */
      const palette = [];
      
      for (let i = 0; i < 16; i++) {
            palette.push(buildRowShade(i, 16 - i, 16));
      }
      /**
       * @type {HexColor[]}
       */
      const gray = [];

      for (let i = 0; i < 16; i++) {
            gray.push(getHex(i,i,i));      
      }
      palette.push(gray)
      return palette;
}
/**
 * 
 * @param {{ onClick: (color: HexColor) => void }} param0 
 */
export function ColorPicker({ onClick }) {
      const colors = getColorGradient();
      const events = useInput().events;

      const comp = Vertical({}, 
            ...
            colors
            .map((row,i) => 
                  Horizontal({ height: 1 },
                        ...row
                        .map((color) => 
                              Box({ background:  color}, '  ')
                        )
                  )
            )
      );

      comp.resize(colors[0].length*2, colors.length);

      if (onClick) {
            events.on(Action.Click, ev => {
                  const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                  let {x,y} = data;

                  if (comp.contains(x,y)) {
                        x -= comp.offsetX - comp.x;
                        y -= comp.offsetY - comp.y;
                        onClick(colors[y][Math.trunc(x/2)]);
                  }
            });
      }
      return comp;
}