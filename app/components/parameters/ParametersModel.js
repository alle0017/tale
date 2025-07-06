import GameObjectModel from "../GameObjectModel.js";

/**
 * @implements {GameObjectModel}
 */
export default class ParametersModel extends GameObjectModel {
      /**
       * @type {Set<{
       *    name: string,
       *    type: BooleanConstructor | NumberConstructor | StringConstructor,
       * }>} 
       */
      values = new Set();

      /**
       * 
       * @param {string} name 
       * @returns 
       */
      generateCode(name) {
            return [...this.values.values()].reduce((p,c) => `${c.name}, ${p}`, '');
      }
}