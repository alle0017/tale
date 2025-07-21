/**@import { ButtonApi, FolderApi, Pane } from "tweakpane";*/
import { useProject } from "../../hooks/hooks.js";
import GameObjectView from "../GameObjectView.js";
import SpriteModel from "./SpriteModel.js";

/**
 * @implements {GameObjectView<SpriteModel>}
 */
export default class SpriteView extends GameObjectView {
      /**
       * @type {FolderApi | undefined}
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
            const proj = useProject();
            const options = {};

            for (const img of proj.images.keys()) {
                  options[img] = img;
            }

            this.#pane = pane.addFolder({ title: 'Sprite' });

            this.#pane.addBinding(this.#model, 'image', {
                  options,
            })

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