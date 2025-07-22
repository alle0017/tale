import { html, $signal, $effect, $watcher } from "@alle0017!/photonjs"
import { useGame, useWorld, createComponent, createEntity, usePosition } from "../src/index.js"
import { model } from "../hooks/directives.js";
import { entities, WORLD, addEntity } from "../stores/scene.js";


export default function SceneBuilder() {
      const name = $signal('scene');
      /**@param {HTMLElement} el */
      const move = el => {
            useGame().ctx.moveRoot(el);
      };

      const e = createEntity()
      e.tags.push('Wall')

      e.add(usePosition());

      addEntity(e);      

      $watcher(() => console.log(entities), entities);

      return html`
            <div style="position: absolute; left: 5px; top: 0px; border-right: var(--border0); height: 100%; width: 250px;">
                  <div class="my-3">
                        <div class="mb-1">Name of the scene</div>
                        <input type="text" model=${model(name)}/>
                  </div>
                  ${$effect(() => 
                        html`<List items=${entities.value.map((_,i) => `entity-${i}`)} @click=${console.log}/>`,entities)
                  }
            </div>
            <div id="cvs-root" style="position: absolute; left: 300px; top: 0px;" use=${move}></div>
      `
}