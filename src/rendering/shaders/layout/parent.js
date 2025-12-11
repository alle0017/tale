import Screen from "../../screen/screen.js";
import { Area } from "../area.js";

export class Parent extends Area {
      /**
       * @type {Area[]}
       */
      #children = [];

      #overflow = true;

      get overflow() {
            return this.#overflow ? 'show': 'hidden'
      }

      set overflow(overflow) {
            this.#overflow = overflow == 'show';
      }

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
            const x = this.x + this.offsetX;
            const y = this.y + this.offsetY;

            children.offsetX = x + this.paddingX;
            children.offsetY = y + this.paddingY;

            if (this.#overflow) {
                  return;
            }

            const boundingBox = {
                  startX: x,
                  startY: y,
                  endX: x + this.width,
                  endY: y + this.height,
            };
            const stack = [children];

            while (stack.length > 0) {
                  stack[0].boundingBox = boundingBox;

                  if (stack[0] instanceof Parent) {
                        stack.push(...stack[0].#children);
                  }
                  stack.shift();
            }
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
      removeChildren() {
            //@ts-ignore
            this.#children.forEach(child => (child.parent = null));
            this.#children = [];
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