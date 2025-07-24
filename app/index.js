
import { $error, $ref, $signal, GApp, html, } from "@alle0017!/photonjs";
/**@import {Ref} from "@alle0017!/photonjs";*/
import Drawer from "./components/drawer";
import SceneBuilder from "./components/scene-builder";
import Tree from "./components/tree";
import List from "./components/list";

function App() {
      /**@type {Ref<{ toggle(): void, }>} */
      const drawer = $ref();

      $error.catch(console.error)

      return html`
            <SceneBuilder @click=${e => drawer.element.toggle()}/>
            <Drawer ref=${drawer}/>
      `
}

GApp
.registerComponent(Tree)
.registerComponent(List)
.registerComponent(Drawer)
.registerComponent(SceneBuilder)
.createRoot(App)