import { $signal, } from "../../../../node_modules/@alle0017!/photonjs/index.js";
import ImmutableCanvas from "../pixel-editor/immutable-canvas.js";
import Tree from "../tree.js";
/**@import {Signal, VNode, Effect} from  "../../../../node_modules/@alle0017!/photonjs/index.js"*/

/**
 * @returns {{
 *   addAsset(name: string, url: ImmutableCanvas): void;
 *   addComponent(name: string): void;
 *   addScene(name: string): void;
 *   addEntity(name: string): void;
 *   view: Effect<unknown>;
 * }}
 */
export default function useTreeProject() {
      /**
       * @type {import("../tree.js").Tree<string>}
       */
      const entities = {
            name: "🎭 Entities",
            children: []
      };
      /**
       * @type {import("../tree.js").Tree<string>}
       */
      const scenes = {
            name: "🎬 Scenes",
            children: []
      };
      /**
       * @type {import("../tree.js").Tree<string>}
       */
      const components ={
            name: "🧩 Components",
            children: []
      };
      /**
       * @type {import("../tree.js").Tree<ImmutableCanvas>}
       */
      const assets ={
            name: "📦 Assets",
            children: []
      };
      const refresh = $signal(false);

      return {
            /**
             * @param {string} name 
             * @param {ImmutableCanvas} cvs 
             */
            addAsset(name, cvs) {
                  assets.children.push({
                        name,
                        children: [],
                        data: cvs,
                  });
                  refresh.value = !refresh.value;
            },
            /**
             * @param {string} name 
             */
            addComponent(name) {
                  components.children.push({
                        name,
                        children: [],
                        data: ''
                  });
                  refresh.value = !refresh;
            },
            /**
             * @param {string} name 
             */
            addScene(name) {
                  scenes.children.push({
                        name,
                        children: [],
                        data: ''
                  });
                  refresh.value = !refresh;
            },
            /**
             * @param {string} name 
             */
            addEntity(name) {
                  entities.children.push({
                        name,
                        children: [],
                        data: ''
                  });
                  refresh.value = !refresh;
            },
            view: refresh.map(() => Tree(/**@type {{ content: import("../tree.js").Tree<unknown>}}*/
                  ({
                        content: {
                              name: "",
                              children: [
                                    entities,
                                    scenes,
                                    components,
                                    assets
                              ]
                        }
                  }))
            )
      }
}
