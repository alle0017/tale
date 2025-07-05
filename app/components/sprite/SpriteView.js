/**@import { ButtonApi, Pane } from "../../tweakpane-4.0.5/tweakpane-4.0.5.min";*/
import { useImageLoader, useProject } from "../../hooks/hooks.js";
import GameObjectView from "../GameObjectView.js";
import SpriteModel from "./SpriteModel.js";

/**
 * @implements {GameObjectView<SpriteModel>}
 */
export default class SpriteView extends GameObjectView {
      /**
       * @type {Pane | undefined}
       */
      #pane;
      #model = new SpriteModel();

      get model() {
            return this.#model;
      }

      /**
       * 
       * @param {Pane} pane
       */
      open(pane) {
            this.#pane = pane.addFolder({ title: 'Sprite' });

            /**@type {ButtonApi} */
            const btn = this.#pane.addButton({
                  label: 'image',
                  title: 'upload'
            }).on('click', async () => {
                  const {img, name} = await useImageLoader();
                  const proj = useProject();

                  btn.title = name;
                  proj.images.set(name, img);
                  this.#model.image = name;
            });

            this.#pane.addBinding(this.#model, 'startX');
            this.#pane.addBinding(this.#model, 'startY');
            this.#pane.addBinding(this.#model, 'endX');
            this.#pane.addBinding(this.#model, 'endY');
            this.#pane.addBinding(this.#model, 'scale');
            this.#pane.addBinding(this.#model, 'rotation');
            this.#pane.addBinding(this.#model, 'x');
            this.#pane.addBinding(this.#model, 'y');
            this.#pane.addBinding(this.#model, 'zIndex');
      }

      dispose() {
            if (!this.#pane) {
                  return;
            }

            this.#pane.dispose();
            this.#pane = undefined;
      }
}