
import { Area } from "../rendering/shaders/area.js";
import { Vertical as VC } from "../rendering/shaders/layout/vertical.js";

/**
 * 
 * @param {Partial<VC>} props 
 * @param  {...Area} children 
 */
export function Vertical(props,...children) {
      const entries = Object.entries(props);
      const comp = new VC();

      for (let i = 0; i < entries.length; i++) {
            const [k,v] = entries[i];

            comp[k] = v;
      }

      if (children && children.length > 0) {
            comp.children.push(...children);
      }
 
      return comp;
}