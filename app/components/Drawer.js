import { $ref, html } from "../fw/index.js";

/**
 * 
 * @param {{
 * ref: {},
 * children: unknown[]
 * }} props 
 * @returns 
 */
export default function Drawer(props) {
      const drawer = $ref();
      const layout = $ref();
      const show = () => layout.element.appendChild(drawer.element);
      const hide = () => drawer.element.remove();
      const toggle = () => drawer.element.isConnected? hide(): show();

      if (props.ref) {
             Object.defineProperty(props.ref, 'toggle', {
                  value: toggle
            });
      }
     
      return html`
            <div ref=${layout}>
                  <div class="drawer" ref=${drawer}>
                        <div class="layout">
                              <div class="header row g-3 p-1 center">
                                    <h3 class="col">Drawer header</h3>
                                    <button 
                                          class="icon-btn col sc-3"
                                          @click=${hide}
                                          aria-label="close button"
                                    >
                                          <img src="./icons/x.svg" width="24"></img>
                                    </button>
                              </div>
                              <div class="body">
                                    ${props.children}
                              </div>
                        </div>
                  </div>
            </div>
      `
}