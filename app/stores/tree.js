import { $signal } from "@alle0017!/photonjs";
import { createState } from "../store";
/**@import {Tree} from "../components/ui/tree" */

/**
 * @typedef {{ 
 *}} TreeData
 */

const {accessor, mutator,} = createState({
      visible: true,
      /** 
       * @type {Tree<TreeData>}
       */
      tree: {
            name: '',
            children: [],
      },
      /**
       * @type {(name: Tree<TreeData>) => void}
       */
      onClick: undefined
});

export const tree = accessor(state => state.tree);
export const visible = accessor(state => state.visible);
/**
 * @type {import("@alle0017!/photonjs").Signal<(name: Tree<TreeData>) => void>}
 */
export const onClick = $signal(undefined);

/**
 * append to the tree
 * @type {(item: Tree<unknown>) => void}
 */
export const push = mutator((state, item) => { 
      state.tree.children.push(item)
      return state;
});
/**
 * remove all items with specified name
 * @type {(item: string) => void} 
 */
export const remove = mutator((state, item) => { 
      state.tree.children = state.tree.children.filter(i => i.name !== item);
      return state;
});
/**
 * remove all items and replace them with items array
 * @type {(tree: Tree<unknown>[]) => void} 
 */
export const replaceAll = mutator((state, tree) => { 
      state.tree.children = tree;
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