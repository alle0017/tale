import { ButtonApi, Pane } from "../../tweakpane-4.0.5/tweakpane-4.0.5.min.js";
import createBodyComponent from "./Body.js";
import createPositionComponent from "./Position.js";
import { useImageLoader, useProject } from "../../hooks/hooks.js";


/**
 * 
 * @param {HTMLElement} root
 * @param {import("../../Resumable").Entity} state 
 */
export default function Entity(root, state) {
      const proj = useProject();

      if (!state.name) {
            state.name = proj.baseEntityName;
      }
      const pane = new Pane({
            container: root
      });
      const folder = pane.addFolder({
            title: state.name,
      });

      /**@type {Pane} */
      let posPane;
      /**@type {Pane} */
      let bodyPane;

      /**@type {Partial<import("../../Resumable").Entity>} */
      const entity = {
            get name() {
                  return state.name;
            },
            set name(val) {
                  const old = state.name;

                  state.name = val;
                  folder.title = val;
                  
                  if (proj.bodies.has(old)) {
                        const body = proj.bodies.get(old);
                        proj.bodies.set(val, body);
                  }

                  if (proj.positions.has(old)) {
                        const pos = proj.positions.get(old);
                        proj.positions.set(val, pos);
                  }
            },
            get position() {
                  return state.position;
            },
            set position(value) {
                  state.position = value;

                  if (state.position) {
                        posPane = createPositionComponent(pane, entity.name);
                  } else if (posPane) {
                        posPane.dispose();
                        posPane = undefined;
                  }
            },
            get body() {
                  return state.body;
            },
            set body(value) {
                  state.body = value;

                  if (state.body) {
                        bodyPane = createBodyComponent(pane, entity.name);
                  } else if (bodyPane) {
                        bodyPane.dispose();
                        bodyPane = undefined;
                  }
            },
      };

      folder.addBinding(entity, 'name');

      /**@type {ButtonApi} */
      const btn = folder.addButton({
            label: 'image',
            title: 'upload'
      }).on('click', async () => {
            const {img, name} = await useImageLoader();
            btn.title = name;
            state.image = name;
            proj.images.set(name, img);
      })

      folder.addBinding(entity, 'position');
      folder.addBinding(entity, 'body');
      folder.addBinding(state, 'customScript');

      if (state.position) {
            posPane = createPositionComponent(pane, entity.name);
      }
      
      if (state.body) {
            bodyPane = createBodyComponent(pane, entity.name);
      }
      
      return pane.dispose.bind(pane);
}