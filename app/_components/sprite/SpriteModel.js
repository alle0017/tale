import GameObjectModel from "../GameObjectModel.js";

/**
 * @implements {GameObjectModel}
 */
export default class SpriteModel extends GameObjectModel {
      image = '';
      zIndex = 0;
      startX = 0;
      startY = 0;
      endX = 32;
      endY = 32;
      x = 0;
      y = 0;
      scale = 1;
      rotation = 0;

      /**
       * 
       * @param {string} name 
       * @returns 
       */
      generateCode(name) {
            return `
                  const ${name} = useSprite(${this.image});
                  ${name}.sprite.zIndex = ${this.zIndex};
                  ${name}.sprite.startX = ${this.startX};
                  ${name}.sprite.startY = ${this.startY};
                  ${name}.sprite.endX = ${this.endX};
                  ${name}.sprite.endY = ${this.endY};
                  ${name}.sprite.x = ${this.x};
                  ${name}.sprite.y = ${this.y};
                  ${name}.sprite.rotation = ${this.rotation};
                  ${name}.sprite.scale = ${this.scale};
            `;
      }
}