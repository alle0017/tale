import { createState } from "../store";
/**@import {VNode} from "@alle0017!/photonjs" */



const {accessor, mutator,} = createState({
      visible: true,
      /**
       * @type {VNode<HTMLElement>[]}
       */
      children: [],
});

export const visible = accessor(state => state.visible);
export const children = accessor(state => state.children);

/**
 * set the visibility of the element
 * @type {(visible: boolean) => void}
 */
export const setVisibility = mutator((state, visible) => { 
      state.visible = visible;
      return state;
});
/**
 * @type {(children: VNode<HTMLElement>[]) => void}
 */
export const append = mutator((state, children) => {
      state.children = children;
      return state;
});