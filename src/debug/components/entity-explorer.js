import { html, $signal, $effect, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import { useGame } from "../../game/Game.js"
import Tree from "./tree.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/
/**@import {Entity} from "../../ecs/Entity" */
import ComponentBox from "./component-box.js";
import { view } from "./main.js";

export default function EntityExplorer() {
      const game = useGame();
      /**@type {Signal<Entity<{}>[]>} */
      const entities = $signal(game.worlds.current? game.worlds.current.entities: []);

      /**@type {() => boolean} */
      let unsubscribe;

      game.worlds.events.on('enter', () => {
            if (unsubscribe) {
                  unsubscribe();
            }
            entities.value = game.worlds.current.entities;

            unsubscribe = game.worlds.current.events.on('change', () => {
                  entities.value = game.worlds.current.entities;
            });
      })
      return html`
            ${$effect(() => Tree({ 
                        content: { 
                              name: 'entities', 
                              children:  entities.value.map(e => ({ 
                                    name: e.id, 
                                    children: [], 
                                    tooltip: `tags: [${e.tags.length > 0 ? [...e.tags].join(','): 'None'}]`,
                                    data: e,
                              }))
                        },
                        onClick: e => {
                              view.value = ComponentBox({ entity: e.data });
                        }
                  })
            ,entities)}
      `
}