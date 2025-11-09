
import { Area } from "../rendering/shaders/area.js";
import { Horizontal as HC } from "../rendering/shaders/layout/horizontal.js";
import { createComponent } from "./component.js";

export const Horizontal = createComponent(
      /**
       * 
       * @param {Partial<import("./component.js").Props<{ gap?: number, color?: import("../rendering/rendering/canvas.js").HexColor, background?: import("../rendering/rendering/canvas.js").HexColor }>>} props 
       * @param  {...Area} children 
       * @returns 
       */
      (props,...children) => {
            const comp = new HC();

            
            comp.gap = props.gap ?? comp.gap;
            comp.color = props.color ?? comp.color;
            comp.background = props.background ?? comp.background;
            comp.border.background = props.background || '#000';
            comp.border.color = props.color || '#FFF';
            
            if (children && children.length > 0) {
                  comp.append(...children);
            }
      
            return comp;
      }
)