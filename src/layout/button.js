import { useInput } from "../lib/input.js";
import { Area } from "../rendering/shaders/area.js";
import { Border } from "../rendering/shaders/border.js";
import { createComponent } from "./component.js";
/**@import { Props } from "./component.js";*/
/**@import { BorderType } from "../rendering/shaders/border.js";*/
/**@import {HexColor} from "../rendering/rendering/canvas.js" */


export const Button = createComponent(
      /**
       * 
       * @param {Partial<{ color: HexColor, background: HexColor, label: string } & Props>} props 
       * @param  {...Area} children 
       */
      (props, ...children) => {
            const btn = new Area();
            const dt = Math.trunc((props.width - (props.label?.length || 0))/2);

            btn.setLine(Math.trunc(props.height/2), ' '.repeat(dt) + (props.label || '') + ' '.repeat(dt));
            btn.color = props.color || '#FFF';
            btn.background = props.background || '#000';
            btn.border.background = props.background || '#000';
            btn.border.color = props.color || '#FFF';

            return btn;
      }
)
/**
 * 
 * @param {{
 *    label: string,
 *    width?: number
 *    height?: number,
 *    background?: HexColor,
 *    color?: HexColor,
 *    onClick?: (param: { x: number, y: number, released: boolean }, btn: Area) => void,
 *    onHover?: (param: { x: number, y: number, released: boolean }, btn: Area) => void,
 *    border?: BorderType
 * }} param0 
 *
export function Button({ label, width, height, onClick, onHover, background, color, border }) {
      height ??= 1;
      width ??= label.length;
      background ??= '#000';
      color ??= '#FFF';
      border ??= Border.None;


      const dt = Math.trunc((width - label.length)/2);
      const btn = new Area();
      const events = useInput().events;

      btn.color = color;
      btn.background = background;
      btn.border.style = border;
      btn.border.background = background;
      btn.border.color = color;
      btn.resize(width, height);
      btn.setLine(Math.trunc(height/2), ' '.repeat(dt) + label + ' '.repeat(dt));

      if (onClick) {
            events.on(Action.Click, ev => {
                  const data = /**@type {{ x: number, y: number, released: boolean }}*(ev.data);
                  const {x,y} = data;
      
                  if (btn.contains(x,y)) {
                        onClick?.(data,btn);
                  }
            });
      }

      if (onHover) {
            events.on(Action.Hover, ev => {
                  const data = /**@type {{ x: number, y: number, released: boolean }}*(ev.data);
                  const {x,y} = data;
      
                  if (btn.contains(x,y)) {
                        onHover?.(data,btn);
                  }
            });
      }

      return btn;
}*/