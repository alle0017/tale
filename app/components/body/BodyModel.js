import GameObjectModel from "../GameObjectModel.js";

/**
 * @implements {GameObjectModel}
 */
export default class BodyModel extends GameObjectModel {
      x = 0;
      y = 0;
      width = 0;
      height = 0;

      /**
       * 
       * @param {string} name 
       * @returns 
       */
      generateCode(name) {
            return `
                  const ${name} = useBody();
                  ${name}.x = ${this.x};
                  ${name}.y = ${this.y};
                  ${name}.width = ${this.width};
                  ${name}.height = ${this.height};
            `;
      }
}