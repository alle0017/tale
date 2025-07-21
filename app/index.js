import { $ref, $signal, GApp, html, } from "@alle0017!/photonjs";
/**@import {Ref} from "@alle0017!/photonjs";*/
import Drawer from "./components/drawer";
function App() {
      return html`
            <Drawer/>
      `
}

GApp.registerComponent(Drawer)
.createRoot(App)