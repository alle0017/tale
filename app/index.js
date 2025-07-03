import { $ref, GApp, html } from "./fw/index.js";
import { useActive } from "./hooks/hooks.js";
import Drawer from "./components/Drawer.js";
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



      cvsRoot.onLoad(cvs => {
            drawer.toggle();

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
                  <li class="row g-2" @click=${active}>
                        <img src="./icons/entity.svg" class="col" width="18"></img>
                        <span class="col">
                              Entities
                        </span>
                  </li>

            </ul>
            <Drawer ref=${drawer}>
                  <div ref=${layout}>
                  </div>
            </Drawer>
            <div ref=${cvsRoot} class="resizable main" style="width: 300px; height: 250px;">
                  <canvas ref=${canvas} width="300" height="250"></canvas>
            </div>
      `
}

GApp
.registerComponent(Drawer)
.createRoot(App)