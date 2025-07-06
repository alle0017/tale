import { useProject } from "../../hooks/hooks.js";
import EntityView from "../entity/EntityView.js";
/**@import {Pane} from "tweakpane" */

/**
 * @type {import("../types").Tab & {current: undefined | EntityView}}
 */
export default {
      /**
       * @type {undefined | EntityView}
       */
      current: undefined,
      icon: './icons/entity.svg',
      get items() {
            const proj = useProject();

            return [...proj.entities.values()].map(e => e.model.name);
      },
      /**
       * @param {string} name 
       * @param {Pane} pane 
       */
      use(name, pane) {
            const proj = useProject();

            for (const e of proj.entities) {
                  if (e.model.name === name) {
                        this.current = e;
                  }
            }

            this.current.open(pane);
      },
      create(pane) {
            const proj = useProject();
            const entity = new EntityView();

            proj.entities.add(entity);
            this.current = entity;
            this.current.open(pane);
      },
      delete() {
            if (!this.current) {
                  return;
            }

            const proj = useProject();
            proj.entities.delete(this.current);
            this.current = undefined;
      },
      clean() {
            if (!this.current) {
                  return;
            }

            this.current.dispose();
      }
}