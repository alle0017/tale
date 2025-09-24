import { html, $signal, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import css from "./css.module.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/

export const view = $signal(html``);
export default function Main() {
      return html`
            <style>${css}</style>
            <FrameRate/>
            <div style="height: 80%; position: fixed; top: 10%; width: 300px; left: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                  ${view}
            </div>
      `
}