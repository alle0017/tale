
import { $error, $ref, $signal, $watcher, GApp, html, } from "@alle0017!/photonjs";
/**@import {Ref, Signal} from "@alle0017!/photonjs";*/
/**@import {Component} from "./src/ecs/Component";*/

import Drawer from "./components/drawer";
import SceneBuilder from "./components/scene-builder";
import Tree from "./components/tree";
import List from "./components/list";

function App() {
      /**@type {Ref<{ toggle(): void, }>} */
      const drawer = $ref();
      const drawerTitle = $signal('');
      /**@type {Signal<Component<string, {}>[]>} */
      const components = $signal([]);
      /**@param {import("./src/ecs/Entity").Entity<{}>} e*/
      function sceneBuilderClicked(e) {
            drawerTitle.value = e.id;
            drawer.element.toggle();
            components.value = [...e.getAll().values()];
      }

      $error.catch(console.error)

      return html`
            <SceneBuilder @click=${sceneBuilderClicked}/>
            <Drawer ref=${drawer}>
                        <div style="font-size: var(--fs1); align-items: center;" class="row g-1">
                              <span class="col"># </span>
                              <input class="col" type="text" value=${drawerTitle}/>
                        </div>
                        ${components.map(e => html`
                              <div class="mt-3">
                                    ${e.$$name}
                              </div>`
                        )}
            </Drawer>
      `
}

GApp
.registerComponent(Tree)
.registerComponent(List)
.registerComponent(Drawer)
.registerComponent(SceneBuilder)
.createRoot(App)