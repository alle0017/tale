import { useProject } from "../../hooks/hooks.js";
import EntityView from "../entity/EntityView.js";

/**
 * @type {import("../types").Tab<EntityView>}
 */
export default {
      /**
       * @type {undefined | EntityView}
       */
      current: undefined,
      /**
       * @param {string} name 
       */
      use(name) {
            const proj = useProject();

            for (const e of proj.entities) {
                  if (e.model.name === name) {
                        this.current = e;
                  }
            }
      },
      create() {
            const proj = useProject();
            const entity = new EntityView();

            proj.entities.add(entity);
            this.current = entity;
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