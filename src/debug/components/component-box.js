import { html, } from "../../../node_modules/@alle0017!/photonjs/index.js";
/**@import {Ref,VNode} from "../../../node_modules/@alle0017!/photonjs/index.js";*/

/**
 * 
 * @param {{
 *    entity: import("../../ecs/Entity.js").Entity<{}>
 * }} param0 
 */
export default function ComponentBox({ entity }) {
      console.log([...entity
                  .getAll()
                  .entries()])
      if (!entity) {
            return;
      }
      return html`
      <div style="border-bottom: 1px solid var(--bg2); margin-bottom: 20px; width: 100%;">
            ${entity.id.toUpperCase()}
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
            ${[...entity.getAll().entries()]
                  .map(([k,v]) => html`
                        <div>
                              <ObjectBinder label=${k} source=${v.state}/>
                        </div>
                  `)
                  .flat(2)}
      </div>
      `;
}     