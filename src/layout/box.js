
import { Area } from "../rendering/shaders/area.js";

/**
 * 
 * @param {Partial<Area>} props 
 * @param {...string} text 
 */
export function Box(props, ...text) {
      const entries = Object.entries(props);
      const comp = new Area();

      for (let i = 0; i < entries.length; i++) {
            const [k,v] = entries[i];

            comp[k] = v;
      }

      for (let i = 0; i < text.length; i++) {
            comp.setLine(i, text[i]);
      }
      return comp;
}

/**
 * @param {string} text 
 */
export function Text(text) {
      const comp = new Area();

      comp.setLine(0, text);

      return comp;
}