import { createDrawable, } from "./Drawable.js";
/**@import Screen from "../rendering/screen/screen.js";*/
/**@import {Coordinates} from "./index.d.ts" */
 /**
 * @template {{}} T
 * @param {T} state 
 * @param {(screen: Screen, state: T) => void} shader 
 * @returns {{ draw(screen: Screen): void, state: T }}
 */
function ShaderComponent(shader, state) {

      return {
            /**
             * @type {T}
             */
            state,
            /**
             * 
             * @param {Screen} screen 
             */
            draw(screen) {
                  shader(screen, this.state);
            }
      };
}
/**
 * @type {import("../ecs/Component.js").Component<{
 *    draw(screen: Screen): void, 
 *    state: {}
 * }, [(screen: Screen, state: {}) => void, state: {}]>}
 */
export const Shader = createDrawable(ShaderComponent);