import { useWorld, World } from "../src";
import { createState } from "../store";
/**@import {Entity} from "../src/ecs/Entity" */
/**
* @template T
* @param {T} obj
*/
const cloner = obj => {
      if (!(obj instanceof World)) {
            return obj;
      }
      const cpy = useWorld();

      for (const e of obj.entities) {
            cpy.add(e);
      }
      return /**@type {T}*/(cpy);
}
const {accessor, mutator} = createState(useWorld(), cloner);


export const WORLD = accessor(w => w);
export const entities = accessor(w => w.entities);
export const addEntity = mutator(
/**
* @param {Entity<unknown>} entity
*/
(world, entity) => {
      world.add(entity);
      return world;
});
export const reset = mutator(world => {
      world.entities.forEach(world.remove);
      return world;
})    