/**@import { VNode } from "../..";*/
import { $signal } from "../../index.js";

/**
 * @template {`/${string}`} T
 * @template {T} K
 */
export default class Router {
      /**
       * @type {HTMLElement}
       */
      #root;
      /**
       * @type {Record<T,{ route: () => VNode<HTMLElement>[], protected: boolean}>}
       * @readonly
       */
      #proto;
      /**
       * @type {Map<T,HTMLElement[]>}
       * @readonly
       */
      #routes = new Map();
      #route = $signal("");
      /**
       * @readonly
       * @type {T}
       */
      #default;
      /**
       * @type {(path: T) => boolean}
       */
      #check;

      get root() {
            return this.#root;
      }
      set root(value) {
            this.#root = value;
      }

      get route() {
            return this.#route;
      }

      /**
       * @param {Record<T,{ route: () => VNode<HTMLElement>[], protected: boolean}>} routes 
       * @param {(path: T) => boolean} check 
       * @param {K} landing 
       */
      constructor(routes, check, landing = undefined) {
            this.#check = check;
            this.#proto = routes;
            this.#default = landing;
      }

      /**
       * @param {T} route 
       */
      navigate(route) {
            if (this.#proto[route].protected && !this.#check(route)) {
                  console.warn("[Router] permission denied")

                  if (this.#default) {
                        this.navigate(this.#default);
                  }

                  return;
            }

            if (!this.#routes.has(route)) {
                  const tree = this.#proto[route].route().map(node => node.render());
                  this.#routes.set(route, tree);
            }
            
            this.#root.innerHTML = '';
            this.#routes.get(route).forEach(node => this.#root.appendChild(node));
            this.#route.value = route;
      }

      /**
       * force mount of external page into the router.
       * Previous history is kept alive, so the current page will
       * be considered the one displayed when this method is invoked.
       * @param {VNode<HTMLElement>[]} page 
       */
      mount(page) {

            this.#root.innerHTML = '';
            page.forEach(node => this.#root.appendChild(node.render()));
      }
}