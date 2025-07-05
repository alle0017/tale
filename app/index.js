import { $error, $ref, $signal, GApp, html, Signal } from "./fw/index.js";
import { useActive } from "./hooks/hooks.js";
import Drawer from "./components/Drawer.js";
import Explorer from "./components/Explorer.js";
import { Pane } from "./tweakpane-4.0.5/tweakpane-4.0.5.min.js";
import EntityTab from "./components/tabs/EntityTab.js";
import GameObjectView from "./components/GameObjectView.js";
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
      /**
       * @type {Signal<readonly string[]>}
       */
      const items = $signal([]);
      const icon = $signal('');
      /**
       * @type {import("./components/types.d.ts").Tab<GameObjectView>}
       */
      let tab;
      /**
       * @type {Pane}
       */
      let pane;

      layout.onLoad(el => {
            pane = new Pane({ container: el });
      });
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
                        header.value = 'Entities';
                        tab = EntityTab;
                        items.value = tab.items;
                        icon.value = tab.icon;
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

                        tab.clean();
                        tab.create();
                        tab.current.open(pane);
                        items.value = tab.items;
                        
                        if (!drawer.isOpen()) {
                              drawer.toggle();
                        }
                  }}
                  @open=${name => {
                        if (!tab) {
                              return;
                        }

                        tab.clean();
                        tab.use(name);
                        tab.current.open(pane);

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

                        tab.clean();
                        tab.delete();
                        items.value = tab.items;
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