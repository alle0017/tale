/**@import Screen from "../../../rendering/screen/screen.js";*/
/**@import {HexColor} from "../../../rendering/rendering/canvas.js" */
/**@import {BorderType} from "./border-type.js" */

import { BoundingBoxComponent } from "./bounding-box.js";

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
       * @type {string}
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
       * @param {BoundingBoxComponent} boundingBox 
       * @returns 
       */
      #drawBorder(screen, width, height, boundingBox) {

            for (let i = 0; i < height; i++) {
                  if (boundingBox.isInBoundingBox(this.x - 1, i + this.y)) {
                        this.#drawSymbol(screen, this.x - 1, i + this.y, this.style.l);
                  }
                  if (boundingBox.isInBoundingBox(this.x + width, i + this.y)) {
                        this.#drawSymbol(screen, this.x + width, i + this.y, this.style.r);
                  }
            }
            for (let i = 0; i < width; i++) {
                  if (boundingBox.isInBoundingBox(this.x + i, this.y)) {
                        this.#drawSymbol(screen, this.x + i, this.y, this.style.t);
                  }
                  if (boundingBox.isInBoundingBox(this.x + i, height + this.y)) {
                        this.#drawSymbol(screen, this.x + i, this.y + height, this.style.b);
                  }
            }

            if (boundingBox.isInBoundingBox(this.x - 1, this.y)) {
                  this.#drawSymbol(screen, this.x - 1, this.y, this.style.lt);
            }

            if (boundingBox.isInBoundingBox(this.x - 1, this.y + height)) {
                  this.#drawSymbol(screen, this.x - 1, this.y + height, this.style.lb);
            }

            if (boundingBox.isInBoundingBox(this.x + width, this.y)) {
                  this.#drawSymbol(screen, this.x + width, this.y, this.style.rt);
            }

            if (boundingBox.isInBoundingBox(this.x + width, this.y + height)) {
                  this.#drawSymbol(screen, this.x + width, this.y + height, this.style.rb);   
            }
      }
      /**
       * 
       * @param {Screen} screen 
       * @param {number} height 
       * @param {number} width
       * @param {BoundingBoxComponent} boundingBox 
       * @returns 
       */
      draw(screen, width, height, boundingBox) {
            if (!this.style) {
                  return;
            }

            this.#drawBorder(screen, width, height, boundingBox);
            
            if (!this.label) {
                  return;
            }

            for (let i = 0; i < this.label.length; i++) {
                  this.#drawSymbol(screen, this.x + Math.trunc(width/10) + i, this.y, this.label[i]);
            }
      }
}