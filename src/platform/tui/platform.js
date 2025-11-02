import { onResize, bootstrap } from "./events.js"
import TuiCanvas from "./canvas.js"
/**@import {PlatformBackend} from "../platform.js" */

export default /**@type {PlatformBackend}*/({
      canvas: (width, height) => new TuiCanvas(width, height),
      resize: onResize,
      input: bootstrap,
});