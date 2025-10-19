import Screen from "../../screen/screen.js";
import { Area } from "../area.js";
import { Parent } from "./parent.js";

export class Vertical extends Parent {
      #offset = 0;

      gap = 1;

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

            children.offsetY += this.#offset;

            this.#offset += children.boxHeight + this.gap;
      }
}