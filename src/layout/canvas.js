import { Canvas as CC } from "../rendering/shaders/layout/canvas.js";
import { createComponent } from "./component.js";
/**@import { Props } from "./component.js";*/

export const Canvas = createComponent(
      /**
       * 
       * @param {import("./component.js").Props} props 
       * @param  {...any} _ 
       */
      (props, ..._) => new CC()
);