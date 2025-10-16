import { ProgressBar as PB } from "../rendering/shaders/layout/progress-bar.js";

/**
 * 
 * @param {Partial<PB>} props 
 */
export function ProgressBar(props) {
      const entries = Object.entries(props);
      const comp = new PB();

      for (let i = 0; i < entries.length; i++) {
            const [k,v] = entries[i];

            comp[k] = v;
      }
      
      return comp;
}