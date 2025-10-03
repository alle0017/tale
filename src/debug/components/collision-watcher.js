import { html, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import { createComponent } from "../../ecs/Component.js";
import { useSystem } from "../../ecs/System.js";
import { useGame } from "../../game/Game.js";
import { Body } from "../../lib/collisions/Collision.js";
import { Rect } from "../../lib/Rect.js";
import { createEntity } from "../../ecs/Entity.js";
/**@import {Entity} from "../../ecs/Entity.js" */
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/
/**
 * @typedef {{
 *   entity: Entity,
 *   remove: () => void;
 *   update: (body: import("../../lib/index.js").RigidBody) => void;
 * }} MaterialCollider
 */

const Visible = createComponent( 
      /**
       * @param {[number,number,number]} color 
       * @returns {MaterialCollider}
       */
      (color) => {
            const rect = Rect.create();
            const entity = createEntity().add(rect);

            rect.zIndex = -1;

            useGame().worlds.current.add(entity);

            entity.tags.push('meta');
            entity.tags.push('collider');
            const col = [...color, 1]
            rect.colors = col.concat(col).concat(col).concat(col);

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
                        rect.x = body.x;
                        rect.y = body.y;
                        rect.width = body.width;
                        rect.height = body.height;
                  }
            }
})
export default function CollisionWatcher() {
      const colorInc = 0.2;
      let show = false;
      /**
       * @type {[number,number,number]}
       */
      const col = [0,0,colorInc]

      useSystem(e => {
            if (!show && e.has(Visible)) {
                  e.get(Visible).remove();
                  e.remove(Visible);
            } else if (show && !e.has(Visible)) {
                  const comp = Visible.create(col);

                  col[2] += colorInc;

                  if (col[2] > 1) {
                        col[2] = 0;
                        col[1] += colorInc;

                        if (col[1] > 1) {
                              col[1] = 0;
                              col[0] += colorInc;
                        }
                  }
                  comp.entity.tags.push(e.id + '');

                  e.add(comp);
            } 
            
            if (show) {
                  e.get(Visible).update(e.get(Body));
            }
      }, Body)

      return html`
            <div style="display: flex; gap: 10px;">
                  <input type="checkbox" value="false" @click=${() => show = !show}/>
                  show bodies
            </div>
      `
}