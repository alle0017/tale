import { html, $signal, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import css from "./css.module.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/

export const view = $signal(html``);
export const MAIN = $signal(html``);


export default function Main() {
      return html`
            <style>${css}</style>
            ${MAIN}
      `     
}