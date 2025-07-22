import { useWorld } from "../src";
import { createState } from "../store";
/**@import {Entity} from "../src/ecs/Entity" */

const {accessor, mutator,} = createState(useWorld());

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