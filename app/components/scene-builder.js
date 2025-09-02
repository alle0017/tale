import { $watcher, html, $signal } from "@alle0017!/photonjs";
import * as BottomBar from "../stores/bottom-bar";
import * as Drawer from "../stores/drawer";
import * as Tree from "../stores/tree";
import { createScene, scenes, derive, addEntityToScene } from "../stores/project/project";
import { ComponentsAccordion } from "./ui/component-accordion";

/**
 * 
 * @param {() => void} callback 
 * @param  {import("@alle0017!/photonjs").Reactive<unknown>} subs 
 */
const $bind = (callback, subs) => {
      $watcher(callback, subs);
      callback();
}
const setUpEvents = () => {
      const body = $signal(html``);

      Drawer.append(html`<div>${body}</div>`);
      BottomBar.onClick.value = scene => {
            const {accessor} = derive('scenes', scene);
            const entities = accessor(scene => scene.entities);

            $bind(() => {
                  Tree.replaceAll(entities.value.map(entity => ({
                        name: entity.name,
                        tooltip: `${entity.name}  [${entity.type}]`,
                        children: [],
                        data: entity,
                  })));
            }, entities);
      };
      Tree.onClick.value = target => {
            body.value = ComponentsAccordion({ entity: /**@type {EntityInstance}*/(target.data) })    
      };
}
export default function SceneBuilder() {
      setUpEvents();
      $bind(() => {
            BottomBar.replaceAll(Object.keys(scenes.value).map(scene => ({
                        name: scene,
                        image: './icons/scene.svg'
                  })
            ))
      }, scenes);

      setTimeout(() => {
            createScene('Default');
            addEntityToScene('Default', {
                  components: [{
                        name: 'Position',
                        attributes: [{
                              name: 'x',
                              type: 'number',
                              value: '0.0'
                        }, {
                              name: 'y',
                              type: 'number',
                              value: '0.0'
                        }]
                  }],
                  type: 'None',
                  name: 'Anonymous'
            })
      }, 100)
}