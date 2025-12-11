/**
 * @typedef {{
 *    startX: number,
 *    startY: number,
 *    endX: number,
 *    endY: number,
 * }} BoundingBox
 */
export class BoundingBoxComponent {
      /**
       * @type {BoundingBox}
       */
      #boundingBox;
      get boundingBox() {
            return this.#boundingBox;
      }

      set boundingBox(box) {
            this.#mergeBoundingBox(box);
      }

      /**
       * @param {BoundingBox} box 
       */
      #mergeBoundingBox(box) {
            if (!this.#boundingBox) {
                  this.#boundingBox = box;
                  return;
            }

            if (box.startX > this.#boundingBox.startX) {
                  this.#boundingBox.startX = box.startX;
            }

            if (box.startY > this.#boundingBox.startY) {
                  this.#boundingBox.startY = box.startY;
            }

            if (box.endX < this.#boundingBox.endX) {
                  this.#boundingBox.endX = box.endX;
            }

            if (box.endY < this.#boundingBox.endY) {
                  this.#boundingBox.endY = box.endY;
            }
      }

      /**
       * 
       * @param {number} x 
       * @param {number} y 
       */
      isInBoundingBox(x, y) {
            return !this.boundingBox ||
                  (
                        x > this.boundingBox.startX &&
                        x < this.boundingBox.endX &&
                        y > this.boundingBox.startY &&
                        y < this.boundingBox.endY
                  );
      }
}
