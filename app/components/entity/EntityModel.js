import { useProject } from "../../hooks/hooks.js";
import GameObjectModel from "../GameObjectModel.js";

/**
 * @implements {GameObjectModel}
 */
export default class EntityModel extends GameObjectModel {
      customScript = false;
      name = useProject().baseEntityName;

      /**
       * 
       * @param {string} name 
       * @returns 
       */
      generateCode(name) {
            return `
                  function ${this.name}() {
                        const ${name} = createEntity();
                        ${[...this.links.entries()]
                              .map(([k,v]) => `${v.model.generateCode(k)}\n${name}.add(${k});\n`)
                              .reduce((p,c) => p + c, '')
                        }
                        ${this.customScript? `main(${name});`: ''}
                        return ${name};
                  }
            `;
      }
}