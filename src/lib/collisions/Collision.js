import ChunkIterator from "./ChunkIterator.js";
import { createComponent } from "../../ecs/Component.js";
import List from "../../types/List.js"
import { useUnhandledSystem } from "../../ecs/System.js";
import EventManager from "../../ecs/Event.js";
/**@import {RigidBody} from ".." */
/**@import {Entity} from "../../ecs/Entity.js" */


export const Body = createComponent(/**@returns {RigidBody} */() => {
      /**@type {List<(body: Entity) => void>} */
      /**@type {EventManager<'collision'>} */
      const events = new EventManager();
      
      return {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
            events,
      }
});
/**
 * create a collision system where, 
 * each body registered to it, is checked
 * to see whether is colliding with 
 * something else, in that case triggers 
 * an event of collision
 */
export const useCollisionSystem = () => {
      return useUnhandledSystem(entities => {
            const iterator = new ChunkIterator(entities, Body);

            while (iterator.hasNext()) {
                  const chunk = iterator.getChunk();

                  for (const body of chunk) {
                        iterator.getCurrent().get(Body).events.trigger('collision', body);
                  }
                  iterator.next();
            }
      }, Body);
}