import Screen from "../../screen/screen.js";
import { Area } from "../area.js";

export class Parent extends Area {
      /**
       * @type {Area[]}
       */
      #children = [];

      paddingX = 0;
      paddingY = 0;

      get children() {
            return this.#children;
      }

      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            super.draw(screen);

            for (let i = 0; i < this.#children.length; i++) {
                  this.position(this.#children[i]);
                  this.#children[i].draw(screen);
            }
      }

      /**
       * strategy to implement for positioning 
       * children inside the parent
       * @param {Area} children 
       */
      position(children) {
            children.offsetX = this.x + this.paddingX + this.offsetX;
            children.offsetY = this.y + this.paddingY + this.offsetY;
      }
}