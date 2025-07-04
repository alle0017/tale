import { useProject } from "../../hooks/hooks.js";
import { Pane } from "../../tweakpane-4.0.5/tweakpane-4.0.5.min.js";

/**
 * 
 * @param {Pane} pane 
 * @param {string} name 
 */
export default function createPositionComponent(pane, name) {

      const proj = useProject();
      if (!proj.positions.has(name)) {
            proj.positions.set(name, {
                  x: 0,
                  y: 0
            });
      }
      /**
       * @type {import("../../Resumable.js").Position}
       */
      const pos = proj.positions.get(name);

      const posPane = pane.addFolder({
                              title: 'Position'
                        });
      posPane.addBinding(pos, 'x');
      posPane.addBinding(pos, 'y');
      return posPane;
}