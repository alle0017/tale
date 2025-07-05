/**@import { FolderApi, Pane } from "tweakpane";*/
import GameObjectView from "../GameObjectView.js";
import PositionModel from "./PositionModel.js";

/**
 * @implements {GameObjectView<PositionModel>}
 */
export default class PositionView extends GameObjectView {
      /**
       * @type {FolderApi | undefined}
       */
      #pane;
      #model = new PositionModel();

      get model() {
            return this.#model;
      }

      /**
       * 
       * @param {Pane} pane
       */
      open(pane) {
            this.#pane = pane.addFolder({ title: 'Position' });
            this.#pane.addBinding(this.#model, 'x');
            this.#pane.addBinding(this.#model, 'y');
      }

      dispose() {
            if (!this.#pane) {
                  return;
            }

            this.#pane.dispose();
            this.#pane = undefined;
      }
}