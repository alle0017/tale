/**@import { Pane } from "../../tweakpane-4.0.5/tweakpane-4.0.5.min";*/
import GameObjectView from "../GameObjectView.js";
import EntityModel from "./EntityModel.js";

/**
 * @implements {GameObjectView<EntityModel>}
 */
export default class EntityView extends GameObjectView {
      /**
       * @type {Pane | undefined}
       */
      #pane;
      #model = new EntityModel();

      get model() {
            return this.#model;
      }

      /**
       * 
       * @param {Pane} pane
       */
      open(pane) {
            const self = this;
            this.#pane = pane.addFolder({ title: this.#model.name });
            this.#pane.addBinding({
                  get name() {
                        return self.model.name;
                  },
                  set name(value) {
                        self.#pane.title = value;
                        self.#model.name = value;
                  }
            }, 'name');
            this.createLinks(this.#pane);
            this.#pane.addBinding(this.#model, 'customScript');
      }

      dispose() {
            if (!this.#pane) {
                  return;
            }

            for (const link of this.#model.links.values()) {
                  link.dispose();
            }

            this.#pane.dispose();
            this.#pane = undefined;
      }
}