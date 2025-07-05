/**@import { Pane } from "../../tweakpane-4.0.5/tweakpane-4.0.5.min";*/
import GameObjectView from "../GameObjectView.js";
import BodyModel from "./BodyModel.js";

/**
 * @implements {GameObjectView<BodyModel>}
 */
export default class BodyView extends GameObjectView {
      /**
       * @type {Pane | undefined}
       */
      #pane;
      #model = new BodyModel();

      get model() {
            return this.#model;
      }

      /**
       * 
       * @param {Pane} pane
       */
      open(pane) {
            this.#pane = pane.addFolder({ title: 'Body' });
            this.#pane.addBinding(this.#model, 'x');
            this.#pane.addBinding(this.#model, 'y');
            this.#pane.addBinding(this.#model, 'width');
            this.#pane.addBinding(this.#model, 'height');
      }

      dispose() {
            if (!this.#pane) {
                  return;
            }

            this.#pane.dispose();
            this.#pane = undefined;
      }
}