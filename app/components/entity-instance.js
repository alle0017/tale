/**@import {Entity} from "../src/ecs/Entity" */

import { $ref, html } from "@alle0017!/photonjs";
import { Pane } from "tweakpane";

/**
 * @param {{
 * entity: Entity<{}>
 *}} param0 
 */
export default function EntityInstance({ entity }) {
      const root = $ref();

      root.onLoad(container => {
            const pane = new Pane({
                  container,
            });

            entity.getAll().forEach((v,k) => {
                  const folder = pane.addFolder({ title: k });   
            });
      });
      return html`<div ref=${root}/>`
}