import { html, $signal, $effect, $watcher } from "@alle0017!/photonjs"
import { useGame, useWorld, createComponent, createEntity, usePosition } from "../src/index.js"
import { model } from "../hooks/directives.js";
import { entities, WORLD, addEntity } from "../stores/scene.js";

/**
 * 
 * @param {{
 *     onClick?: (el: import("../src/ecs/Entity.js").Entity<{}>) => void,
 * }} param0 
 * @returns 
 */
export default function SceneBuilder({ onClick }) {
      const name = $signal('scene');
      /**@param {HTMLElement} el */
      const move = el => {
            useGame().ctx.moveRoot(el);
      };
      /**
       * 
       * @param {string} e 
       * @returns 
       */
      const click = e => {
            if (!onClick) {
                  return;
            }
            const id = e.replace('# ', '');
            
            onClick(entities.value.filter(e => e.id === id).at(0));
      };
      const e = createEntity()
      e.tags.push('Wall')

      e.add(usePosition());

      $watcher(() => console.log(entities.value), entities);
      addEntity(e);      


      return html`
            <div style="position: absolute; left: 5px; top: 0px; border-right: var(--border0); height: 100%; width: 250px;">
                  <div class="my-3">
                        <div class="mb-1">Name of the scene</div>
                        <input type="text" model=${model(name)}/>
                  </div>
                  ${$effect(() => html`
                        <List 
                              icon="./icons/entity.svg"
                              items=${entities.value.map(e => `# ${e.id}`)} 
                              @click=${click}
                        />`,
                  entities)}
            </div>
            <div id="cvs-root" style="position: absolute; left: 300px; top: 0px;" use=${move}></div>
      `
}