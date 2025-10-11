import { GApp, html, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import cssModule from "./css.module.js";
import { view } from "./main.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/

export default function DynamicInspector() {
      return html`
            <FrameRate/>
            <div style="height: 20px; position: fixed; top: 10%; width: 300px; left: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                  <b @click=${() => {
                        const windowFeatures = "left=100,top=100,width=320,height=320";
                        const handle = window.open(
                              "about:blank",
                              "Editor",
                              windowFeatures,
                        );
                        if (!handle) {
                              return;
                        }
                        handle.addEventListener('load', () => {
                              GApp.createRoot(() => html`
                                    <style>
                                          ${cssModule}
                                          body {
                                                background-color: var(--bg);
                                          }
                                    </style>
                                    <div style="display: flex; justify-content: center;">
                                          <Editor @save=${(_,url) => {
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.download = 'image.png';
                                                link.click();
                                          }}/>
                                    </div>
                              `, handle.document.body)
                        })
                  }}>Open Editor</b>
            </div>
            <div style="height: 60%; position: fixed; top: 20%; width: 300px; left: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                  <CollisionWatcher/>
                  ${view}
            </div>
      `     
}

