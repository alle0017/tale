import { onResize, bootstrap } from "./events.js"
import WebCanvas from "./canvas.js"
/**@import {PlatformBackend} from "../platform.js" */

export default /**@type {PlatformBackend}*/({
      canvas: (width, height) => new WebCanvas(width, height),
      resize: onResize,
      input: bootstrap,
});