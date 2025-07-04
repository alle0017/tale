import { $ref, html } from "../fw/index.js";

/**
 * 
 * @param {{
 * ref: {},
 * children: unknown[],
 * header: unknown,
 * onDelete: () => void,
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
            Object.defineProperty(props.ref, 'isOpen', {
                  value: () => drawer.element.isConnected
            });
      }
     
      return html`
            <div ref=${layout}>
                  <div class="drawer" ref=${drawer}>
                        <div class="layout">
                              <div class="header row g-3 p-1 center">
                                    <h3 class="col">${props.header}</h3>
                                    <button 
                                          class="icon-btn col sc-2"
                                          @click=${() => props.onDelete?.call()}
                                          aria-label="delete button"
                                    >
                                          <img src="./icons/trash.svg" width="16"></img>
                                    </button>
                                    <button 
                                          class="icon-btn col"
                                          @click=${hide}
                                          aria-label="close button"
                                    >
                                          <img src="./icons/x.svg" width="16"></img>
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