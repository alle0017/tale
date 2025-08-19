import { $watcher } from "@alle0017!/photonjs";
import * as BottomBar from "../stores/bottom-bar";
import * as Drawer from "../stores/drawer";
import * as Tree from "../stores/tree";
import { _state, createScene, scenes, derive, addEntityToScene } from "../stores/project/project";
export default function SceneBuilder() {
      $watcher(() => {
            BottomBar.replaceAll(Object.keys(scenes.value).map(scene => ({
                        name: scene,
                        image: './icons/scene.svg'
                  })
            ))
      }, scenes);

      BottomBar.onClick.value = scene => {
            console.log(scene)
            const {accessor} = derive('scenes', scene);
            const entities = accessor(scene => scene.entities);

            $watcher(() => {
                  Tree.replaceAll(entities.value.map(entity => ({
                        name: entity.name,
                        tooltip: `${entity.name}  [${entity.type}]`,
                        children: [],
                        data: entity,
                  })));
            }, entities);
      };

      BottomBar.replaceAll(Object.keys(scenes.value).map(scene => ({
                  name: scene,
                  image: './icons/scene.svg'
            })
      ));
      setTimeout(() => {
            createScene('Default');
            addEntityToScene('Default', {
                  components: [],
                  type: 'monster',
                  name: 'Anonymous'
            })
      }, 1000)
}