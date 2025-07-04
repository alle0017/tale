import { $error, $ref, $signal, GApp, html } from "./fw/index.js";
import { useActive } from "./hooks/hooks.js";
import Drawer from "./components/Drawer.js";
import Explorer from "./components/Explorer.js";
import useEntity from "./components/tabs/Entity.js";
/**@import Ref from "./fw/lib/Signals/Reference.js";*/

function App() {
      const active = useActive('active');
      const drawer = {};
      /**
       * @type {Ref<HTMLCanvasElement>}
       */
      const canvas = $ref();
      const cvsRoot = $ref();
      const layout = $ref();

      const header = $signal('');
      const items = $signal([]);
      const icon = $signal('');

      /**
       * @type {import("./components/types.js").Tab}
       */
      let tab;
      /**
       * @type {string}
       */
      let activeElement;

      $error.catch(console.error)



      cvsRoot.onLoad(cvs => {
            drawer.toggle()
            const resizeObserver = new ResizeObserver(entries => {
                  for (const entry of entries) {
                        const { width, height } = entry.contentRect;

                        canvas.element.width = width;
                        canvas.element.height = height;
                  }
            });

            resizeObserver.observe(cvs);
      });


      return html`
            <ul class="navbar up-bar">
                  <li class="row g-2" @click=${active}>
                        <img src="./icons/scene.svg" class="col" width="18"></img>
                        <span class="col">
                              Scenes
                        </span>
                  </li>
                  <li class="row g-2" @click=${e => { 
                        active(e); 
                        tab = useEntity(header, items, icon);
                  }}>
                        <img src="./icons/entity.svg" class="col" width="18"></img>
                        <span class="col">
                              Entities
                        </span>
                  </li>
            </ul>
            <Explorer 
                  icon=${icon}
                  items=${items}
                  @create=${() => {
                        if (!tab) {
                              return;
                        }
                        const name = tab.create();
                        tab.clean(layout.element);
                        tab.open(layout.element, name);
                        activeElement = name;
                        if (!drawer.isOpen()) {
                              drawer.toggle();
                        }
                  }}
                  @open=${name => {
                        if (!tab) {
                              return;
                        }

                        activeElement = name;
                        tab.clean(layout.element);
                        tab.open(layout.element, name);

                        if (!drawer.isOpen()) {
                              drawer.toggle();
                        }
                  }}
            />
            <Drawer 
                  ref=${drawer} 
                  header=${header}
                  @delete=${() => {
                        if (!tab) {
                              return;
                        }

                        tab.delete(activeElement);
                  }}>
                  <div ref=${layout} class="list g-1 px-1"></div>
            </Drawer>
            <div ref=${cvsRoot} class="resizable main" style="width: 300px; height: 250px;">
                  <canvas ref=${canvas} width="300" height="250"></canvas>
            </div>
      `
}

GApp
.registerComponent(Drawer)
.registerComponent(Explorer)
.createRoot(App)