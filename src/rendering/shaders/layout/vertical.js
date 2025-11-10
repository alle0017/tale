import Screen from "../../screen/screen.js";
import { Area } from "../area.js";
import { Parent } from "./parent.js";

export class Vertical extends Parent {
      #offset = 0;

      gap = 1;
      get boxWidth() {
            return this.#getChildrenWidth();
      }
      #getChildrenWidth() {
            let offset = super.boxWidth;

            for (let i = 0; i < this.children.length; i++) {
                  const child = this.children[i];
                  offset = Math.max(offset, child.boxWidth);
            }

            return offset;
      }
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