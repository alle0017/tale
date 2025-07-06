/**@import { FolderApi, Pane } from "tweakpane";*/
import GameObjectView from "../GameObjectView.js";
import ParametersModel from "./ParametersModel.js";
/**
 * 
 * @param {string} type 
 */
function typeToConstructor(type) {
      switch(type) {
            case 'number': return Number;
            case 'string': return String;
            case 'boolean': return Boolean;
      }
}     

/**
 * 
 * @param {NumberConstructor | BooleanConstructor | StringConstructor} constr 
 */
function constructorToType(constr) {
      switch(constr) {
            case Number: return 'number';
            case Boolean: return 'boolean';
            case String: return 'string';
      }
}

/**
 * @implements {GameObjectView<ParametersModel>}
 */
export default class ParametersView extends GameObjectView {
      #idx = 0;
      /**
       * @type {FolderApi | undefined}
       */
      #pane;
      #model = new ParametersModel();

      get model() {
            return this.#model;
      }

      /**
       * 
       * @param {{
       *    name: string,
       *    type: BooleanConstructor | NumberConstructor | StringConstructor,
       * }} param 
       */
      #openParamPane(param) {
            const folder = this.#pane.addFolder({ title: param.name });


            folder.addBinding({
                  get name() {
                        return param.name;
                  },
                  set name(val) {
                        param.name = val;
                        folder.title = val;
                  }
            }, 'name');

            folder.addBinding({
                  get type() {
                        return constructorToType(param.type);
                  },
                  set type(val) {
                        param.type = typeToConstructor(val);
                  }
            }, 'type', {
                  options: {
                        number: 'number',
                        string: 'string',
                        boolean: 'boolean',
                  }
            });

            const deleteBtn = folder.addButton({ title: '-', label: 'delete' });

            deleteBtn.on('click', () => {
                  folder.dispose();
                  this.#model.values.delete(param);
            });
      }

      /**
       * 
       * @param {Pane | FolderApi} pane
       */
      open(pane) {
            this.#pane = pane.addFolder({ title: 'Parameters' });
            const btn = this.#pane.addButton({
                  title: '+',
                  label: 'add',
            });

            for (const param of this.#model.values) {
                  this.#openParamPane(param);
            }

            btn.on('click', () => {
                  const param = {
                        name: `parameter${this.#idx++}`,
                        /**@type {NumberConstructor | BooleanConstructor | StringConstructor} */
                        type: Number
                  };

                  this.#openParamPane(param);
                  this.#model.values.add(param);
            });
      }

      dispose() {
            if (!this.#pane) {
                  return;
            }

            this.#pane.dispose();
            this.#pane = undefined;
      }
}