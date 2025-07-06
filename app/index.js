import { $error, $ref, $signal, GApp, html, Signal } from "./fw/index.js";
import { useActive } from "./hooks/hooks.js";
import Drawer from "./components/Drawer.js";
import Explorer from "./components/Explorer.js";
import { Pane } from "tweakpane";
import { Menu, useRouter } from "./router.js";

function App() {
      const active = useActive('active');
      const drawer = {};
      const layout = $ref();
      const root = $ref();
      const header = $signal('');
      /**
       * @type {Signal<readonly string[]>}
       */
      const items = $signal([]);
      const icon = $signal('');
      /**
       * @type {import("./components/types.d.ts").Tab}
       */
      let tab;
      /**
       * @type {Pane}
       */
      let pane;

      layout.onLoad(el => { pane = new Pane({ container: el }) });
      $error.catch(console.error);

      root.onLoad(el => {
            const router = useRouter();

            router.router.root = el;
      });

      return html`
            <ul class="navbar up-bar bg">
                  ${Menu.map( value => 
                  html`<li class="row g-2" @click=${e => { 
                              active(e); 
                              header.value = value.route;

                              if (tab) {
                                    tab.clean();
                              }
                              tab = value.tab;
                              items.value = tab.items;
                              icon.value = tab.icon;
                        }}>
                              <img src=${value.icon} class="col" width="18"></img>
                              <span class="col">
                                    ${value.route}
                              </span>
                        </li>`
                  )}
            </ul>
            <div ref=${root} class="main"></div>
            <Explorer 
                  icon=${icon}
                  items=${items}
                  @create=${async () => {
                        if (!tab) {
                              return;
                        }

                        tab.clean();
                        const ret = tab.create(pane);

                        if (ret && ret instanceof Promise) {
                              ret.then(() => {
                                    items.value = tab.items;
                        
                                    if (!drawer.isOpen()) {
                                          drawer.toggle();
                                    }
                              });
                        } else {
                              items.value = tab.items;
                        
                              if (!drawer.isOpen()) {
                                    drawer.toggle();
                              }
                        }
                  }}
                  @open=${name => {
                        if (!tab) {
                              return;
                        }

                        tab.clean();
                        tab.use(name, pane);

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
      `
}

GApp
.registerComponent(Drawer)
.registerComponent(Explorer)
.createRoot(App)