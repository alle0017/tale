import { Border, Layout, useInput, World } from "../../src/index.js";
import { Box, createRoot, Vertical } from "../../src/layout.js";
/**
 * @typedef {{
 *    name: string,
 *    action: () => void,
 * }} MenuCommand
 * @param {{
 *  options: MenuCommand[],
 *  scene: World
 * }} param0
 * @returns 
 */
export function Menu({ options, scene }) {
      const pane = Vertical({},
            ...options
            .map(item => 
                  Box({}, item.name)
            )
      );
      const root = createRoot(pane, scene);
      const handler = useInput();
      const CURSOR = '> ';
      let i = 0;

      pane.border.style = Border.SolidRound;
      handler.events.on('up', () => {
            let prev = i;
            i--;
            if (i < 0) {
                  i = options.length - 1;
            }
            const box = pane.children.at(i);
            const old = pane.children.at(prev);

            
            box.setLine(0, CURSOR + box.getLine(0));
            old.setLine(0, old.getLine(0).replace(CURSOR, ''));
      });
      handler.events.on('down', () => {
            let prev = i;
            i++;
            if (i >= options.length) {
                  i = 0;
            }
            const box = pane.children.at(i);
            const old = pane.children.at(prev);

            
            box.setLine(0, CURSOR + box.getLine(0));
            old.setLine(0, old.getLine(0).replace(CURSOR, ''));
      });
      handler.events.on('\r', () => {
            if (options[i].action) {
                  options[i].action();
            }
      });
      const box = pane.children.at(i);
      box.setLine(0, CURSOR + box.getLine(0));

      return root;
}