import { $signal, $watcher, html, } from "../../../node_modules/@alle0017!/photonjs/index.js";
import Home from "./home.js";
import { view } from "./main.js";
/**@import {Ref,VNode} from "../../../node_modules/@alle0017!/photonjs/index.js";*/

/**
 * 
 * @param {{
 *    entity: import("../../ecs/Entity.js").Entity<{}>
 * }} param0 
 */
export default function ComponentBox({ entity }) {
      if (!entity) {
            return;
      }
      const state = $signal(true);
      const components = [...entity.getAll().entries()];

      components.forEach(([_,v]) => {
            v.events.on('access', () => {
                  state.value = !state.value
            });
      });
      
      return html`
      <div style="border-bottom: 1px solid var(--bg2); margin-bottom: 20px; width: 100%; display: flex; align-items: center; height: 50px;">
            <span style="height: 32px; display: flex; align-items: center;">
                  ${entity.id.toUpperCase()}
            </span>
            <span @click=${() => (view.value = Home())} style="position: absolute; right: 10px; font-size: 20px; width: 24px; height: 24px; text-align: center" class="hv">
                  x
            </span>
      </div>
      <ChipInput value=${[...entity.tags]}/>
      <div style="display: flex; flex-direction: column; gap: 10px;">
            ${state.map(() => 
                  components.map(([k,v]) => html`
                              <div>
                                    <ObjectBinder label=${k} source=${v.state}/>
                              </div>
                        `
                  )
                  .flat(3)
            )}
      </div>
      `;
}     