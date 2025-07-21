import { $error, $ref, $signal, GApp, html, } from "@alle0017!/photonjs";
/**@import {Ref} from "@alle0017!/photonjs";*/
import Drawer from "./components/drawer";
import SceneBuilder from "./components/scene-builder";
function App() {
      $error.catch(console.error)
      return html`
            <SceneBuilder/>
      `
}

GApp
.registerComponent(Drawer)
.registerComponent(SceneBuilder)
.createRoot(App)