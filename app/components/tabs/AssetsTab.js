import { useImageLoader, useProject } from "../../hooks/hooks.js";
import { useRouter } from "../../router.js";
import { useImage } from "../Image.js";
/**@import {Pane} from "tweakpane" */

/**
 * @type {import("../types").Tab}
 */
export default {
      icon: './icons/assets.svg',
      get items() {
            const proj = useProject();

            return [...proj.images.keys()];
      },
      /**
       * @param {string} name 
       * @param {Pane} pane 
       */
      use(name, pane) {
            const proj = useProject();

            useRouter().router.navigate('/asset');
            useImage().img.value = proj.images.get(name);
      },
      async create() {
            const {img, name} = await useImageLoader();
            const proj = useProject();

            proj.images.set(name, img);
      },
      delete() {},
      clean() {}
}