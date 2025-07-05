/**@import GameObjectView from "./GameObjectView";*/

/**
 * @abstract
 */
export default class GameObjectModel {
      /**
       * @type {Map<string, GameObjectView<GameObjectModel>>}
       */
      links = new Map();
      /**
       * @type {{
       *    name: string,
       *    type: typeof GameObjectView<GameObjectModel>,
       * }[]}
       */
      linkable = [];

      /**
       * @abstract
       * @param {string} name
       * @returns {string}
       */
      generateCode(name) {
            throw new Error("generate code must be implemented")
      }

      /**
       * link this object to an object that
       * contains a link to this model.
       * @param {string} variableName 
       * @param {string} name 
       */
      linkTo(variableName, name) {
            throw new Error("linkTo code must be implemented");
      }
}