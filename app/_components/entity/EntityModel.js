import { useProject } from "../../hooks/hooks.js";
import BodyView from "../body/BodyView.js";
import GameObjectModel from "../GameObjectModel.js";
import PositionView from "../position/PositionView.js";
import SpriteView from "../sprite/SpriteView.js";
import ScriptView from "../script/ScriptView.js";

/**
 * @implements {GameObjectModel}
 */
export default class EntityModel extends GameObjectModel {
      script = new ScriptView();
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
                        ${this.script.model.script? `main(${this.variable});`: ''}
                        return ${this.variable};
                  }
            `;
      }
}