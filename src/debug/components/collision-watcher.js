import { html, $signal, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import { createComponent } from "../../ecs/Component.js";
import { useSystem } from "../../ecs/System.js";
import { useGame } from "../../game/Game.js";
import { body } from "../../lib/collisions/Collision.js";
import { rect, useRect } from "../../lib/Rect.js";
import { createEntity } from "../../ecs/Entity.js";
import GPUEntity2D from "../../rendering/shader/entity/GPUEntity2D.js";
/**@import {Entity} from "../../ecs/Entity.js" */
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/
const COMPONENT = '__visible_component';
/**
 * @typedef {{
 *   entity: Entity<{ rect: GPUEntity2D }>,
 *   remove: () => void;
 *   update: (body: import("../../lib/index.js").RigidBody) => void;
 * }} MaterialCollider
 */

const [_, useVisibleCollider] = createComponent(COMPONENT, 
      /**
       * @param {[number,number,number]} color 
       * @returns {MaterialCollider}
       */
      (color) => {
            const rect = useRect();
            const entity = createEntity().add(rect);

            entity.id = `MetaCollider__auto__gen`;
            rect.state.zIndex = -1;

            useGame().worlds.current.add(entity);

            entity.tags.push('meta');
            entity.tags.push('collider');
            const col = [...color, 1]
            rect.state.colors = col.concat(col).concat(col).concat(col);

            return {
                  entity,
                  remove: () => {
                        useGame().worlds.current.remove(entity);
                  },
                  /**
                   * 
                   * @param {import("../../lib/index.js").RigidBody} body 
                   */
                  update: (body) => {
                        rect.state.x = body.x;
                        rect.state.y = body.y;
                        rect.state.width = body.width;
                        rect.state.height = body.height;
                  }
            }
})
export default function CollisionWatcher() {
      const colorInc = 0.2;
      let show = false;
      /**
       * @type {[number,number,number]}
       */
      let col = [0,0,colorInc]

      useSystem(e => {
            if (!show && e.has(COMPONENT)) {
                  const entity = /**@type {Entity<{'__visible_component': MaterialCollider, body: import("../../lib/index.js").RigidBody}>}*/(e);
                  entity.__visible_component.remove();
                  entity.remove(COMPONENT)
            } else if (show && !e.has(COMPONENT)) {
                  const comp = useVisibleCollider(col);

                  col[2] += colorInc;

                  if (col[2] > 1) {
                        col[2] = 0;
                        col[1] += colorInc;

                        if (col[1] > 1) {
                              col[1] = 0;
                              col[0] += colorInc;
                        }
                  }
                  comp.state.entity.tags.push(e.id);

                  e.add(comp);
            } 
            
            if (show) {
                  const entity = /**@type {Entity<{'__visible_component': MaterialCollider, body: import("../../lib/index.js").RigidBody}>}*/(e);

                  entity[COMPONENT].update(entity.body);
            }
      }, body)

      return html`
            <div style="display: flex; gap: 10px;">
                  <input type="checkbox" value="false" @click=${() => show = !show}/>
                  show bodies
            </div>
      `
}