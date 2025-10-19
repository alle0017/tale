import { Canvas as CC } from "../rendering/shaders/layout/canvas.js";
import { useInput } from "../lib/input.js";
import { Action } from "../lib/platform/mouse.js";

/**
 * 
 * @param {{
 *    width?: number
 *    height?: number,
 *    onClick?: (param: { x: number, y: number, released: boolean }) => void,
 *    onHover?: (param: { x: number, y: number, released: boolean }) => void,
 * }} props 
 */
export function Canvas({ width, height, onClick, onHover }) {
      const comp = new CC();
      const events = useInput().events;

      width ??= 10;
      height ??= 10;
      
      comp.resize(width, height);

      if (onClick) {
            events.on(Action.Click, ev => {
                  const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                  const {x,y} = data;
      
                  if (comp.contains(x,y)) {
                        onClick?.(data);
                  }
            });
      }

      if (onHover) {
            events.on(Action.Hover, ev => {
                  const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                  const {x,y} = data;
      
                  if (comp.contains(x,y)) {
                        onHover?.(data);
                  }
            });
      }
      return comp;
}