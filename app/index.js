
import { $error, $ref, $signal, $watcher, GApp, html, } from "@alle0017!/photonjs";
/**@import {Ref, Signal} from "@alle0017!/photonjs";*/
/**@import {Component} from "./src/ecs/Component";*/

import Drawer from "./components/drawer";
import SceneBuilder from "./components/scene-builder";
import Tree from "./components/tree";
import List from "./components/list";
import { BottomBarController } from "./components/controller/bottom-bar";
import { items, push } from "./stores/bottom-bar";
function App() {
      $error.catch(console.error)
      setTimeout(() => {
            push({
                  name: 'item',
                  image: 'components/t.jpg'
            })
            console.log(items.value)
      }, 1000)
      return html`
            <BottomBarController/>
      `
}

GApp
.registerComponent(BottomBarController)
.registerComponent(Tree)
.registerComponent(List)
.registerComponent(Drawer)
.registerComponent(SceneBuilder)
.createRoot(App)