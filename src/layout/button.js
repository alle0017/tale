import { useInput } from "../lib/input.js";
import { Area } from "../rendering/shaders/area.js";
import { Action } from "../lib/platform/mouse.js";
import { Border } from "../rendering/shaders/border.js";
/**@import { BorderType } from "../rendering/shaders/border.js";*/
/**@import {HexColor} from "../rendering/rendering/canvas.js" */

/**
 * 
 * @param {{
 *    label: string,
 *    width?: number
 *    height?: number,
 *    background?: HexColor,
 *    color?: HexColor,
 *    onClick?: (param: { x: number, y: number, released: boolean }) => void,
 *    onHover?: (param: { x: number, y: number, released: boolean }) => void,
 *    border?: BorderType
 * }} param0 
 */
export function Button({ label, width, height, onClick, onHover, background, color, border }) {
      height ??= 1;
      width ??= label.length;
      background ??= '#FFF';
      color ??= '#000';
      border ??= Border.None;


      const dt = Math.trunc((width - label.length)/2);
      const btn = new Area();
      const events = useInput().events;

      btn.resize(width, height);
      btn.setLine(Math.trunc(height/2), ' '.repeat(dt) + label);

      if (onClick) {
            events.on(Action.Click, ev => {
                  const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                  const {x,y} = data;
      
                  if (btn.contains(x,y)) {
                        onClick?.(data);
                  }
            });
      }

      if (onHover) {
            events.on(Action.Hover, ev => {
                  const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                  const {x,y} = data;
      
                  if (btn.contains(x,y)) {
                        onHover?.(data);
                  }
            });
      }

      return btn;
}