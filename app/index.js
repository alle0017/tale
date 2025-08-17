
import { $error, $ref, $signal, $watcher, GApp, html, } from "@alle0017!/photonjs";
/**@import {Ref, Signal} from "@alle0017!/photonjs";*/
/**@import {Component} from "./src/ecs/Component";*/
import List from "./components/list";
import { BottomBarController } from "./components/controller/bottom-bar";
import { items, onClick, push, setVisibility } from "./stores/bottom-bar";
import { TreeController } from "./components/controller/tree";
function App() {
      $error.catch(console.error)
      return html`
            <TreeController/>
            <BottomBarController/>
      `
}

GApp
.registerComponent(TreeController)
.registerComponent(BottomBarController)
.registerComponent(List)
.createRoot(App)