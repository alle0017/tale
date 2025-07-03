import { BladeApi, FolderApi, Pane, TabApi } from "./tweakpane-4.0.5/tweakpane-4.0.5.min.js";

function scene() {
      let eid = 0;
      let sid = 0;
      const entities = [];
      /**
       * @param {Pane} pane 
       */
      function bindCamera(pane) {
            /**
             * @type {import("./Resumable").CameraAttachment}
             */
            const config = {
                  rotation: 0,
                  scale: 1,
                  x: 0,
                  y: 0,
            };

            /**@type {FolderApi} */
            const camera = pane.addFolder({
                  title: 'Camera',
                  expanded: false,
            });

            camera.addBinding(config, 'rotation');
            camera.addBinding(config, 'scale');
            camera.addBinding(config, 'x');
            camera.addBinding(config, 'y');

            return config;
      }
      /**
       * 
       * @param {Pane} pane 
       */
      function createEntity(pane) {
            /**@type {FolderApi} */
            const folder = pane.addFolder({
                  title: `Entity-${eid++}`,
            });
            /**@type {string} */
            let variable = folder.title;

            /**@type {import("./Resumable").EntityInstance} */
            const entity = {
                  get variable() {
                        return variable;
                  },
                  set variable(val) {
                        variable = val;
                        folder.title = val;
                  },
                  name: '',
                  params: [],
            };

            folder.addBinding(entity, 'variable');
            folder.addBinding(entity, 'name');
      }

      /**
       * 
       * @param {Pane} pane 
       */
      function createWalls(pane) {
            const folder = pane.addFolder({
                  title: 'wall',
            });

            /**@type {import("./Resumable").Body} */
            const entity = {
                  x: 0,
                  y: 0,
                  width: 32,
                  height: 32,
            };

            folder.addBinding(entity, 'width');
            folder.addBinding(entity, 'height');

            folder.addBinding(entity, 'x');
            folder.addBinding(entity, 'y');

            return entity;
      }

      /**
       * @param {Pane} pane 
       */
      function createEntityInstanceConfig(pane) {
            const btn = pane.addButton({
                  title: 'Create',
                  label: 'Entities', 
            });

            btn.on('click', () => createEntity(pane))
      }

      /**
       * @param {Pane} pane 
       */
      function createWallsConfig(pane) {
            const btn = pane.addButton({
                  title: 'Create',
                  label: 'Walls', 
            });

            btn.on('click', () => createWalls(pane))
      }

      /**
       * 
       * @param {Pane} pane 
       */
      function createSceneConfig(pane) {
            pane.addBinding(pane, 'title');

            /**@type {TabApi} */
            const tab = pane.addTab({
                  pages: [
                        {title: 'Camera'},
                        {title: 'Entities'},
                        {title: 'Walls'},

                  ],
            });

            const camera = bindCamera(tab.pages[0]);

            createEntityInstanceConfig(tab.pages[1]);
            createWallsConfig(tab.pages[2]);

            const config = {
                  name: 'Scene',
                  camera,
            }
      }

      const pane = new Pane();

      const mainscene = pane.addFolder({
            title: `Scene-${sid++}`,
      });

      createSceneConfig(mainscene);
}

scene()
