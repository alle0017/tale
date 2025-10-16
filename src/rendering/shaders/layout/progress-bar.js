import { Area } from "../area.js";
/**@import Screen from "../../screen/screen.js";*/
export class ProgressBar extends Area {
      static DEFAULT_CHAR = '█';
      #label = new Area();
      percentage = 0;
      char = ProgressBar.DEFAULT_CHAR;
      showPercentage = true;
      width = 100;
      /**
       * @type {import("../../rendering/canvas.js").HexColor}
       */
      color = '#6B8';
      get label() {
            return this.#label;
      }
      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            const fill = Math.trunc(this.width * this.percentage/100);

            this.setLine(0, this.char.repeat(fill));

            
            if (this.showPercentage) {
                  const half = Math.trunc(this.width/2);
                  this.#label.setLine(0,this.percentage + '%');
                  this.#label.x = half + this.x;
                  this.#label.y = this.y;
                  this.#label.draw(screen);
            }
            super.draw(screen);
      }
}