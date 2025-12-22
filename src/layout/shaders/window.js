import { Node } from "./node.js";
import { createDrawable } from "../../lib/Drawable.js";
import { addEntity } from "../../ecs/scene.js";
import { createEntity } from "../../ecs/Entity.js";
/**@import {Coordinates} from "../../lib/index.d.ts" */

/**@param {Node} area*/
function LayoutComponent(area) {
      let ticket;
      
      Object.defineProperties(area, {
            bind: {
                  /**
                   * bind the position component
                   * to the area, so whenever the
                   * position component changes the area
                   * will follow it. Every position that 
                   * was previously bind will be unbind
                   * @param {Coordinates} position 
                   */
                  value: (position) => {
                        if (ticket) {
                              ticket();
                        }

                        ticket = position.onMove(pos => {
                              area.style.left = pos.x;
                              area.style.top = pos.y;
                        });
                  },     
            },
            unbind: {
                  /**
                   * detach previously bound 
                   * position.
                   * @throws {Error} if no position was bound
                   */
                  value: () => {
                        if (!ticket) {
                              throw new Error('unbinding failed: position was not bound');
                        }
                        ticket();
                        ticket = undefined;
                  }
            }
      })

      return area
}
/**
 * @returns {Area & { 
 *    bind(position: Position): void;
 *    unbind(): void; 
 * }}
 */
export const Layout = createDrawable(LayoutComponent);
export const createWindow = () => {
      const box = Layout.create(new Node());
      const entity = createEntity().add(box);
      entity.tags.push('window');
      entity.tags.push('ui');
      addEntity(entity);
      return entity;
}