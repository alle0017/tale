/**@import { Pane } from "../tweakpane-4.0.5/tweakpane-4.0.5.min.js";*/
/**@import GameObjectModel from "./GameObjectModel.js";*/

/**
 * @template {GameObjectModel} T
 * @abstract
 */
export default class GameObjectView {
      /**
       * return instance of
       * the specific game object 
       * model
       * @abstract
       * @returns {T}
       */
      get model() {
            throw new Error("model must be implemented")
      }
      /**
       * open a pane usable to modify 
       * the game object
       * @abstract
       * @param {Pane} root 
       */
      open(root) {
            throw new Error("open(Pane) must be implemented")
      }

      dispose() {
            throw new Error("dispose must be implemented")
      }

      /**
       * open a pane usable to modify 
       * the game object
       * @param {Pane} root 
       */
      createLinks(root) {
            for (const link of this.model.linkable) {
                  const self = this;
                  root.addBinding({
                        get link() {
                              return self.model.links.has(link.name);
                        },

                        set link(value) {
                              if (value) {

                                    const linked = new link.type();
                                    self.model.links.set(link.name, linked);
                                    linked.open(root);

                              } else {

                                    const linked = self.model.links.get(link.name);
                                    linked.dispose();
                                    self.model.links.delete(link.name);

                              }
                        }
                  }, 'link', {
                        label: link.name
                  });
            }
      }
}