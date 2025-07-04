import { useProject } from "../../hooks/hooks.js";
import { Pane } from "../../tweakpane-4.0.5/tweakpane-4.0.5.min.js";

/**
 * 
 * @param {Pane} pane 
 * @param {string} name 
 */
export default function createBodyComponent(pane, name) {
      const proj = useProject();
      if (!proj.bodies.has(name)) {
            proj.bodies.set(name, {
                  width: 0,
                  height: 0,
                  x: 0,
                  y: 0
            });
      }
      /**
       * @type {import("../../Resumable.js").Body}
       */
      const body = proj.bodies.get(name);
      /**
       * @type {Pane}
       */
      const posPane = pane.addFolder({
                              title: 'Body'
                        });

      posPane.addBinding(body, 'width');
      posPane.addBinding(body, 'height');
      posPane.addBinding(body, 'x');
      posPane.addBinding(body, 'y');
      
      return posPane;
}