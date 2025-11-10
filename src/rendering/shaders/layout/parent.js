import Screen from "../../screen/screen.js";
import { Area } from "../area.js";

export class Parent extends Area {
      /**
       * @type {Area[]}
       */
      #children = [];

      /**
       * @type {readonly Area[]}
       */
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

      /**
       * append the children to this node
       * @param {Area[]} children 
       */
      append(...children) {
            for (let i = 0; i < children.length; i++) {
                  this.#children.push(children[i]);
                  //@ts-ignore
                  children[i].parent = this;
            }
      }

      /**
       * remove the children from this node
       * @param {Area} children 
       */
      removeChild(children) {
            //@ts-ignore
            children.parent = null;
            this.#children.splice(this.#children.indexOf(children), 1);
      }
      /**
       * remove the children from this node
       * @param {Area} children 
       * @param {Area} replace 
       */
      replaceChild(children, replace) {
            //@ts-ignore
            children.parent = null;
            //@ts-ignore
            replace.parent = this;
            this.#children.splice(this.#children.indexOf(children), 1, replace);
      }
      /**
       * 
       * @param {string} className 
       */
      getElementsByClassName(className) {
            const result = [];
            const children = [...this.#children];

            while (children.length) {
                  const node = children.shift();

                  if (node.classList.includes(className)) {
                        result.push(node);
                  }

                  if (node instanceof Parent && node.#children.length > 0) {
                        children.push(...node.#children);
                  }
            }
            return result;
      }
}