import { $ref, html, isRef } from "@alle0017!/photonjs";
/**@import {Ref} from "@alle0017!/photonjs" */

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
      /**@type {Ref<HTMLElement>} */
      const drawer = $ref();
      const layout = $ref();
      const show = () => (drawer.element.style.display = 'block');
      const hide = () => (drawer.element.style.display = 'none');
      const toggle = () => drawer.element.style.display === 'block' ? hide(): show();

      if (isRef(props.ref)) {

            props.ref.bind({
                  toggle,
                  isOpen: () => drawer.element.style.display === 'block'
            });
      }

     
      return html`
            <div ref=${layout.bind}>
                  <div class="drawer bg" style="z-index: var(--zi-front); display: none;" ref=${drawer.bind}>
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
      `;
}