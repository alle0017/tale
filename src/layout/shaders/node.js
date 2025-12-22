import { FocusComponent } from "./components/focus.js";
import { Style } from "./style.js";
/**@import Screen from "../../rendering/screen/screen.js";*/

export class Node {
      /**
       * @type {string}
       */
      id;
      /**
       * @type {Node}
       */
      parent;
      /**
       * @readonly
       * @type {Style}
       */
      style = new Style();   
      /**
       * @readonly
       */
      focus = new FocusComponent();
      /**
       * @type {Node[]}
       */ 
      #children = [];
      /**
       * @type {Set<string>}
       */
      #classes = new Set();

      get classList() {
            return this.#classes;
      }

      get children() {
            return this.#children;
      }

      /**
       * 
       * @param {string} str 
       */
      static Text(str) {
            const n = new Node();
            n.style.content = str;
            return n;
      }
      /**
       * 
       * @param {string} nodeClass 
       */
      getElementsByClassNames(nodeClass) {
            /**
             * @type {Node[]}
             */
            const res = [];
            /**
             * @type {Node[]}
             */
            const stack = [this];

            while (stack.length > 0) {
                  const curr = stack.shift();

                  for (let i = 0; i < curr.#children.length; i++) {
                        if (curr.#children[i].#classes.has(nodeClass)) {
                              res.push(curr.#children[i]);
                        }

                        if (curr.#children[i].#children.length > 0) {
                              stack.push(curr.#children[i]);
                        }
                  }
            }

            return res;
      }

      /**
       * 
       * @param {string} id 
       */
      getElementById(id) {
            /**
             * @type {Node[]}
             */
            const stack = [this];

            while (stack.length > 0) {
                  const curr = stack.shift();

                  for (let i = 0; i < curr.#children.length; i++) {
                        if (curr.#children[i].id == id) {
                              return curr.#children[i];
                        }

                        if (curr.#children[i].#children.length > 0) {
                              stack.push(curr.#children[i]);
                        }
                  }
            }

            return null;
      }

      /**
       * 
       * @param {Node} children 
       * @param {number} top 
       * @param {number} left 
       */
      position(children, top, left) {
            children.style.$offsetX = left + this.style.paddingLeft;
            children.style.$offsetY = top + this.style.paddingTop;
            this.style.clip(children);
      }

      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            this.style.draw(screen);

            const [left,top] = this.style.getTopLeftCorner(); 

            this.style.positioningStrategy.initialize();

            for (let i = 0; i < this.#children.length; i++) {
                  this.style.positioningStrategy.position(this, this.#children[i], top, left);
                  this.style.clip(this.#children[i]);
                  this.#children[i].draw(screen);
            }
      }

      /**
       * append the children to this node
       * @param {Node[]} children 
       */
      append(...children) {
            for (let i = 0; i < children.length; i++) {
                  this.#children.push(children[i]);
                  children[i].parent = this;
            }
      }

      /**
       * remove the children from this node
       * @param {Node} children 
       */
      removeChild(children) {
            children.parent = null;
            this.#children.splice(this.#children.indexOf(children), 1);
      }
      removeChildren() {
            this.#children.forEach(child => (child.parent = null));
            this.#children = [];
      }
      /**
       * remove the children from this node
       * @param {Node} children 
       * @param {Node} replace 
       */
      replaceChild(children, replace) {
            children.parent = null;
            replace.parent = this;
            this.#children.splice(this.#children.indexOf(children), 1, replace);
      }

      /**
       * checks whether given coordinates are inside 
       * the area
       * @param {number} x 
       * @param {number} y 
       * @return {boolean}
       */
      contains(x, y, delta = 0) {
            const [left,top] = this.style.getTopLeftCorner(); 

            const width = this.style.width;
            const height = this.style.height;

            return (
                  x - delta >= left &&
                  x + delta <= left + width &&
                  y - delta >= top &&
                  y + delta <= top + height
            );
      }
      /** 
       * checks whether given coordinates are inside 
       * the area
       * @param {number} x 
       * @param {number} y 
       * @return {boolean}
       */
      isNear(x,y) {
            return this.contains(x, y, 1);
      }
}