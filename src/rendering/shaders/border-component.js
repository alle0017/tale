/**@import Screen from "../screen/screen.js";*/
/**@import {HexColor} from "../rendering/canvas.js" */
/**@import {Border} from "./border.js" */
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
       * @type {Border}
       */
      style;
      x = 0;
      y = 0;
      z = 0;
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
                  screen.set({
                        x: this.x - 1,
                        y: i + this.y,
                        z: this.z,
                        color: this.color,
                        background: this.background,
                        char: this.style.vertical,
                  });
                  screen.set({
                        x: this.x + width,
                        y: i + this.y,
                        z: this.z,
                        color: this.color,
                        background: this.background,
                        char: this.style.vertical,
                  });
            }
            for (let i = 0; i < width; i++) {
                  screen.set({
                        x: this.x + i,
                        y: this.y,
                        z: this.z,
                        color: this.color,
                        background: this.background,
                        char: this.style.horizontal,
                  });
                  screen.set({
                        x: this.x + i,
                        y: this.y + height,
                        z: this.z,
                        color: this.color,
                        background: this.background,
                        char: this.style.horizontal,
                  });
            }
            screen.set({
                  x: this.x - 1,
                  y: this.y,
                  z: this.z,
                  color: this.color,
                  background: this.background,
                  char: this.style.lt,
            });
            screen.set({
                  x: this.x - 1,
                  y: this.y + height,
                  z: this.z,
                  color: this.color,
                  background: this.background,
                  char: this.style.lb,
            });
            screen.set({
                  x: this.x + width,
                  y: this.y + height,
                  z: this.z,
                  color: this.color,
                  background: this.background,
                  char: this.style.rb,
            });
            screen.set({
                  x: this.x + width,
                  y: this.y,
                  z: this.z,
                  color: this.color,
                  background: this.background,
                  char: this.style.rt,
            });
      }
}