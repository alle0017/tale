import { $signal, html, $effect, } from "../../../node_modules/@alle0017!/photonjs/index.js";
import Editor from "./pixel-editor/editor.js";
import Tree from "./tree.js";
import useTreeProject from "./static-editor/tree.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/

export default function StaticEditor() {
      const project = useTreeProject();
      const mainView = $signal(html``);
      return html`
            <style>
                  body {
                        background-color: var(--bg);
                  }
            </style>
            <div style="display: flex; gap: 5%; min-height: 100%; height: 100vh;">
                  <div style="height: 60%; width: 230px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                        <div style="display: flex; gap: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); font-size: 32px;">
                              <div class="hv" style="padding: 2px 5px;">
                                    📄
                              </div>
                              <div class="hv" style="padding: 1px 5px;" @click=${() => (mainView.value = Editor({ onSave: cvs => project.addAsset('image', cvs) }))}>
                                    🎨
                              </div>
                              <div class="hv" style="padding: 1px 5px;">
                                    🛠
                              </div>
                              <div class="hv" style="padding: 1px 5px;">
                                    ▶️
                              </div>
                        </div>
                        ${project.view}
                  </div>
                  <div style="width: calc(100% - 230px - 30px); height: 100%;">
                        ${mainView}
                  </div>
            </div>
      `;
}