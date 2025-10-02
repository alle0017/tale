import { html, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import { view } from "./main.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/

export default function DynamicInspector() {
      return html`
            <div style="height: 20px; position: fixed; top: 10%; width: 300px; left: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                  <span 
                  class="hv"
                  @click=${() => {
                        const popup = window.open(
                              "https://www.pixilart.com/draw", // URL
                              "popupWindow",         // Window name (reusing name reopens same popup)
                              "width=600,height=400,left=200,top=100,resizable=yes,scrollbars=yes"
                        );
                        popup.close();
                  }}>
                        Pixel editor
                  </span>
            </div>
            <div style="height: 60%; position: fixed; top: 20%; width: 300px; left: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                  <CollisionWatcher/>
                  ${view}
            </div>
      `     
}