import { createState } from "../store";
/**@import {Entity} from "../src/ecs/Entity" */
/**@import {Tree} from "../components/tree" */



const {accessor, mutator,} = createState({
      /**
       * @type {Tree[]}
       */
      tree: []
});

export const tree = accessor(state => state.tree);
/**
 * append to the tree
 * @type {(item: Tree) => void}
 */
export const push = mutator((state, item) => { 
      state.tree.push(item)
      return state;
});
/**
 * remove all items with specified name
 * @type {(item: string) => void} 
 */
export const remove = mutator((state, item) => { 
      state.tree = state.tree.filter(i => i.name !== item);
      return state;
});
