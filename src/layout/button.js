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
       * @param {Partial<{ color: HexColor, background: HexColor, text: string } & Props>} props 
       * @param  {...Area} children 
       */
      (props, ...children) => {
            const btn = new Area();
            const dt = Math.trunc((props.width - (props.text?.length || 0))/2);
            btn.setLine(Math.trunc(props.height/2), ' '.repeat(dt) + (props.text || '') + ' '.repeat(dt));
            btn.color = props.color || '#FFF';
            btn.background = props.background || '#000';
            btn.border.background = props.background || '#000';
            btn.border.color = props.color || '#FFF';

            return btn;
      }
)