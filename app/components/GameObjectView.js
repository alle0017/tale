/**@import { FolderApi, Pane } from "tweakpane";*/
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
       * @param {Pane | FolderApi} root 
       */
      open(root) {
            throw new Error("open(Pane) must be implemented")
      }

      dispose() {
            throw new Error("dispose must be implemented")
      }

      /**
       * @param {Pane | FolderApi} root 
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

      /**
       * @param {Pane | FolderApi} root 
       */
      restoreLinks(root) {
            for (const link of this.model.linkable) {
                  if (this.model.links.has(link.name)) {
                        const linked = this.model.links.get(link.name);
                        this.model.links.set(link.name, linked);
                        linked.open(root);
                  }
            }
      }
}