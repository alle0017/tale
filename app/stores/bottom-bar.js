import { createState } from "../store";
/**@import {Entity} from "../src/ecs/Entity" */
/**@import {Item} from "../components/ui/bottom-bar" */



const {accessor, mutator,} = createState({
      visible: true,
      /**
       * @type {Item[]}
       */
      items: []
});

export const items = accessor(state => state.items);
export const visible = accessor(state => state.visible);
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
 * set the visibility of the element
 * @type {(visible: boolean) => void}
 */
export const setVisibility = mutator((state, visible) => { 
      state.visible = visible;
      return state;
});
