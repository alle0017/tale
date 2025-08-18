import { $ref, html, isRef } from "@alle0017!/photonjs";
/**@import {Ref} from "@alle0017!/photonjs" */

/**
 * 
 * @param {{
 * ref?: {},
 * children: unknown[],
 * header?: unknown,
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
                  <div class="drawer bg" style="z-index: var(--zi-front);" ref=${drawer.bind}>
                        <div class="layout">
                              <div class="body">
                                    ${props.children}
                              </div>
                        </div>
                  </div>
            </div>
      `;
}