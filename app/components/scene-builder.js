import { $watcher } from "@alle0017!/photonjs";
import * as BottomBar from "../stores/bottom-bar";
import * as Drawer from "../stores/drawer";
import * as Tree from "../stores/tree";
import { _state, createScene, scenes } from "../stores/project/project";
export default function SceneBuilder() {
      $watcher(() => {
            BottomBar.replaceAll(Object.keys(scenes.value).map(scene => ({
                        name: scene,
                        image: './icons/scene.svg'
                  })
            ))
      }, scenes);

      BottomBar.replaceAll(Object.keys(scenes.value).map(scene => ({
                  name: scene,
                  image: './icons/scene.svg'
            })
      ));
      setTimeout(() => {
            console.log(scenes.value)
            createScene('Default')
      }, 1000)
}