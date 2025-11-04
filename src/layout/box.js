
import { Area } from "../rendering/shaders/area.js";
import { createComponent } from "./component.js";
/**@import {HexColor} from "../rendering/rendering/canvas.js"*/

export const Box = createComponent(
      /**
       * 
       * @param {Partial<import("./component.js").Props & { background: HexColor, color: HexColor }>} props 
       */
      (props, ...text) => {
            const comp = new Area();

            comp.color = props.color || '#FFF';
            comp.background = props.background || '#000';
            comp.border.background = props.background || '#000';
            comp.border.color = props.color || '#FFF';
            
            for (let i = 0; i < text.length; i++) {
                  comp.setLine(i, text[i].getLine(0));
            }
            return comp;
      }
);

/**
 * @param {string} text 
 */
export function Text(text) {
      const comp = new Area();

      comp.setLine(0, text);

      return comp;
}