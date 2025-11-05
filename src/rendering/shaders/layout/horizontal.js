import Screen from "../../screen/screen.js";
import { Area } from "../area.js";
import { Parent } from "./parent.js";

export class Horizontal extends Parent {
      #offset = 0;

      gap = 0;
      get boxHeight() {
            return this.#getChildrenHeight();
      }
      #getChildrenHeight() {
            let offset = super.boxHeight;

            for (let i = 0; i < this.children.length; i++) {
                  const child = this.children[i];
                  offset = Math.max(offset, child.boxHeight);
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

            children.offsetX += this.#offset;

            this.#offset += children.boxWidth + this.gap;
      }
}