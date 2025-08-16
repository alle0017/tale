import { createState } from "../store";
/**@import {Tree} from "../components/tree" */



const {accessor, mutator,} = createState({
      visible: true,
      /**
       * @type {Tree[]}
       */
      tree: []
});

export const tree = accessor(state => state.tree);
export const visible = accessor(state => state.visible);
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
/**
 * set the visibility of the element
 * @type {(visible: boolean) => void}
 */
export const setVisibility = mutator((state, visible) => { 
      state.visible = visible;
      return state;
});
