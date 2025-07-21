/**@import { ButtonApi, FolderApi, Pane } from "tweakpane";*/
import { useRouter } from "../../router.js";
import { useEditor } from "../editor/Editor.js";
import GameObjectView from "../GameObjectView.js";
import ScriptModel from "./ScriptModel.js";

/**
 * @implements {GameObjectView<ScriptModel>}
 */
export default class ScriptView extends GameObjectView {
      /**
       * @type {FolderApi | undefined}
       */
      #pane;
      /**
       * @type {ButtonApi | undefined}
       */
      #btn;
      #model = new ScriptModel();

      get model() {
            return this.#model;
      }

      #linkEditor() {
            if (this.#model.linked) {
                  this.#btn = this.#pane.addButton({ title: 'open', label: 'script'});

                  this.#btn.on('click', () => {
                        useRouter().router.navigate('/editor');
                        useEditor().text.value = this.#model.script;
                  });
            } else {
                  this.#btn.dispose();
                  this.#btn = undefined;
                  this.#model.script = '';
            }
      }

      /**
       * 
       * @param {Pane | FolderApi} pane
       */
      open(pane) {
            const self = this;
            this.#pane = pane.addFolder({ title: 'Script' });
            this.#pane.addBinding({
                  get customScript() {
                        return self.model.linked;
                  },
                  set customScript(val) {
                        self.model.linked = val;
                        self.#linkEditor();
                  }
            }, 'customScript');
      }

      dispose() {
            if (!this.#pane) {
                  return;
            }

            this.#pane.dispose();
            this.#pane = undefined;
      }
}