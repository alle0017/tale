import { $signal } from "@alle0017!/photonjs";
import { createState } from "../store";
/**@import {Entity} from "../src/ecs/Entity" */
/**@import {Item} from "../components/ui/bottom-bar" */



const {accessor, mutator,} = createState({
      visible: true,
      /**
       * @type {Item[]}
       */
      items: [],
});

export const items = accessor(state => state.items);
export const visible = accessor(state => state.visible);
/**
 * @type {import("@alle0017!/photonjs").Signal<(name: string) => void>}
 */
export const onClick = $signal(undefined);
/**
 * append to the tree
 * @type {(item: Item) => void}
 */
export const push = mutator((state, item) => { 
      state.items.push(item)
      return state;
});
/**
 * remove all items with specified name
 * @type {(item: string) => void} 
 */
export const remove = mutator((state, item) => { 
      state.items = state.items.filter(i => i.name !== item);
      return state;
});
/**
 * remove all items and replace them with items array
 * @type {(items: Item[]) => void} 
 */
export const replaceAll = mutator((state, items) => { 
      state.items = items;
      return state;
});
/**
 * set the visibility of the element
 * @type {(visible: boolean) => void}
 */
export const setVisibility = mutator((state, visible) => { 
      state.visible = visible;
      return state;
});