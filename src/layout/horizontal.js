import { Area } from "../rendering/shaders/area.js";
import { Horizontal as HC } from "../rendering/shaders/layout/horizontal.js";

/**
 * 
 * @param {Partial<HC>} props 
 * @param  {...Area} children 
 */
export function Horizontal(props,...children) {
      const entries = Object.entries(props);
      const comp = new HC();

      for (let i = 0; i < entries.length; i++) {
            const [k,v] = entries[i];

            comp[k] = v;
      }

      if (children && children.length > 0) {
            comp.children.push(...children);
      }
 
      return comp;
}