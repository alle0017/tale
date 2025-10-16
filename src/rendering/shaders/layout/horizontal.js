import Screen from "../../screen/screen.js";
import { Area } from "../area.js";
import { Parent } from "./parent.js";

export class Horizontal extends Parent {
      #offset = 0;

      gap = 0;

      /**
       * @param {Screen} screen 
       */
      draw(screen) {
            this.#offset = 0;
            super.draw(screen);
      }
      /**
       * @param {Area} children 
       */
      position(children) {
            super.position(children);

            children.offsetX += this.#offset;

            this.#offset += children.boxWidth + this.gap;
      }
}