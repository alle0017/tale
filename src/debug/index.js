import { GApp, html, $signal, $effect, } from "../../node_modules/@alle0017!/photonjs/index.js"
import { useGame, Game } from "../game/Game.js"
import Tree from "./components/tree.js";
/**@import {Signal} from  "../../node_modules/@alle0017!/photonjs/index.js"*/
/**@import {Entity} from "../ecs/Entity" */
import css from "./components/css.module.js";
/**
 * 
 * @param {Game} game 
 */
function startDebugging(game) {
      if (startDebugging.initialized) {
            return;
      }

      startDebugging.initialized = true;

      /**@type {Signal<Entity<{}>[]>} */
      const entities = $signal([]);

      game.worlds.current.events.on('change', () => {
            entities.value = game.worlds.current.entities;
      });

      GApp
      .createRoot(() => html`
            <style>${css}</style>
            <div style="height: 80%; position: fixed; top: 10%; width: 250px; left: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px;">
                  ${$effect(() => Tree({ 
                        content: { 
                              name: '', 
                              children:  entities.value.map(e => ({ 
                                    name: e.id, 
                                    children: [], 
                                    tooltip: `tags: [${e.tags.length > 0 ? [...e.tags].join(','): 'None'}]`
                              }))
                        }
                  }), entities)}
            </div>
      `)   
}
startDebugging.initialized = false;
/**#__PURE__ */
export default function Debug() {
      const game = useGame();
      game.worlds.events.on('enter', e => {
            startDebugging(game);
      })
}
