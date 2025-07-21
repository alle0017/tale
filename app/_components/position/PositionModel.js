import GameObjectModel from "../GameObjectModel.js";

/**
 * @implements {GameObjectModel}
 */
export default class PositionModel extends GameObjectModel {
      x = 0;
      y = 0;

      /**
       * 
       * @param {string} name 
       * @returns 
       */
      generateCode(name) {
            return `
                  const ${name} = usePosition();
                  ${name}.x = ${this.x};
                  ${name}.y = ${this.y};
            `;
      }
}