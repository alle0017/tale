import { useProject } from "../../hooks/hooks.js";
import BodyView from "../body/BodyView.js";
import GameObjectModel from "../GameObjectModel.js";
import PositionView from "../position/PositionView.js";
import SpriteView from "../sprite/SpriteView.js";

/**
 * @implements {GameObjectModel}
 */
export default class EntityModel extends GameObjectModel {
      linkable = [{
            name: 'Sprite',
            type: SpriteView
      }, {
            name: 'Position',
            type: PositionView
      }, {
            name: 'Body',
            type: BodyView
      }];

      customScript = false;
      name = useProject().baseEntityName;
      variable = 'entity';


      /**
       * 
       * @param {string} name 
       * @returns 
       */
      generateCode(name) {
            return `
                  function ${this.name}() {
                        const ${this.variable} = createEntity();
                        ${[...this.links.entries()]
                              .map(([k,v]) => `${v.model.generateCode(k)}\n${this.variable}.add(${k});\n`)
                              .reduce((p,c) => p + c, '')
                        }
                        ${this.customScript? `main(${this.variable});`: ''}
                        return ${this.variable};
                  }
            `;
      }
}