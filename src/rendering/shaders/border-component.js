/**@import Screen from "../screen/screen.js";*/
/**@import {HexColor} from "../rendering/canvas.js" */
/**@import { Area } from "./area.js";*/

/**@import {BorderType} from "./border.js" */
export class BorderComponent {
      /**
       * @type {HexColor}
       */
      background = '#FFF';
      /**
       * @type {HexColor}
       */
      color = '#000';

      /**
       * @type {BorderType}
       */
      style;
      x = 0;
      y = 0;
      z = 0;
      /**
       * @type {Area}
       */
      label;
      /**
       * 
       * @param {Screen} screen 
       * @param {number} x 
       * @param {number} y 
       * @param {string} symbol 
       */
      #drawSymbol(screen, x, y, symbol) {
            screen.set({
                  x,
                  y,
                  z: this.z,
                  color: this.color,
                  background: this.background,
                  char: symbol,
            });
      }
      /**
       * 
       * @param {Screen} screen 
       * @param {number} height 
       * @param {number} width
       * @returns 
       */
      draw(screen, width, height) {
            if (!this.style) {
                  return;
            }
            for (let i = 0; i < height; i++) {
                  this.#drawSymbol(screen, this.x - 1, i + this.y, this.style.vertical);
                  this.#drawSymbol(screen, this.x + width, i + this.y, this.style.vertical);
            }
            for (let i = 0; i < width; i++) {
                  this.#drawSymbol(screen, this.x + i, this.y, this.style.horizontal);
                  this.#drawSymbol(screen, this.x + i, this.y + height, this.style.horizontal);
            }
            this.#drawSymbol(screen, this.x - 1, this.y, this.style.lt);
            this.#drawSymbol(screen, this.x - 1, this.y + height, this.style.lb);
            this.#drawSymbol(screen, this.x + width, this.y, this.style.rt);
            this.#drawSymbol(screen, this.x + width, this.y + height, this.style.rb);   

            if (!this.label) {
                  return;
            }
            this.label.x = this.x + Math.trunc(width/10);
            this.label.y = this.y;
            this.label.draw(screen);
      }
}