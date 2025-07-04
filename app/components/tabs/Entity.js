import { Signal } from "../../fw/index.js";
import { useProject } from "../../hooks/hooks.js";
import Entity from "../pane/Entity.js";

/**
 * 
 * @param {Signal<string>} headerText 
 * @param {Signal<string[]>} items 
 * @param {Signal<string>} icon
 * @returns {import("../types.js").Tab}
 */
export default function useEntity(headerText, items, icon) {
      const proj = useProject();
      /**@type {() => void} */
      let dispose;

      headerText.value = "Entities";
      icon.value = './icons/entity.svg';
      items.value = [...proj.entities.keys()].map(e => e.name);

      return {
            create: () => {
                  const entity = {
                        name: proj.baseEntityName,
                        customScript: false,
                        image: "",
                        position: false,
                        body: false
                  };

                  items.value.push(entity.name);
                  proj.entities.add(entity)

                  return entity.name;
            },
            clean: layout => {
                  items.value = [...proj.entities.keys()].map(e => e.name);
                  if (dispose) {
                        dispose()
                  }
            },
            open: (layout,name) => {
                  for (const e of proj.entities) {
                        if (e.name === name) {
                              dispose = Entity(layout, e);
                              break;
                        }
                  }
            }
      }
}