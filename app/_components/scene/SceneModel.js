import { useProject } from "../../hooks/hooks.js";
import BodyView from "../body/BodyView.js";
import GameObjectModel from "../GameObjectModel.js";
import PositionView from "../position/PositionView.js";
import SpriteView from "../sprite/SpriteView.js";
import ScriptView from "../script/ScriptView.js";

/**
 * @implements {GameObjectModel}
 */
export default class SceneModel extends GameObjectModel {
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

      name = useProject().baseSceneName;
      variable = 'scene';


      /**
       * 
       * @param {string} name 
       * @returns 
       */
      generateCode(name) {
            return `
                  function ${this.name}() {
                        const ${this.variable} = useScene();
                        ${this.script.model.script? `main(${this.variable});`: ''}
                        return ${this.variable};
                  }
            `;
      }
}