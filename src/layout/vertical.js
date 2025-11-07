
import { Area } from "../rendering/shaders/area.js";
import { Vertical as VC } from "../rendering/shaders/layout/vertical.js";
import { createComponent } from "./component.js";

/**
 * 
 * @param  {...Area} children 
 */
export const Vertical = createComponent(
      /**
       * 
       * @param {Partial<import("./component.js").Props<{ gap: number, color: import("../rendering/rendering/canvas.js").HexColor, background: import("../rendering/rendering/canvas.js").HexColor }>>} props 
       * @param  {...Area} children 
       * @returns 
       */
      (props,...children) => {
            const comp = new VC();

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