import GameObjectModel from "../GameObjectModel.js";

/**
 * @implements {GameObjectModel}
 */
export default class ScriptModel extends GameObjectModel {
      linked = false;
      script = '';

      /**
       * 
       * @param {string} name 
       * @returns 
       */
      generateCode(name) {
            return this.script;
      }
}