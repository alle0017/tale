
import { $error, $ref, $signal, $watcher, GApp, html, } from "@alle0017!/photonjs";
/**@import {Ref, Signal} from "@alle0017!/photonjs";*/
/**@import {Component} from "./src/ecs/Component";*/
import List from "./components/list";
import { BottomBarController } from "./components/controller/bottom-bar";
import { TreeController } from "./components/controller/tree";
import { DrawerController } from "./components/controller/drawer";
import SceneBuilder from "./components/scene-builder";
function App() {
      $error.catch(console.error)
      setTimeout(() => {
            SceneBuilder()
      }, 1000)
      return html`
            <DrawerController/>
            <TreeController/>
            <BottomBarController/>
      `
}

GApp
.registerComponent(DrawerController)
.registerComponent(TreeController)
.registerComponent(BottomBarController)
.registerComponent(List)
.createRoot(App)