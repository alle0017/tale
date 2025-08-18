import { html } from "@alle0017!/photonjs";

/**
 * 
 * @param {{
 *    items: string[],
 *    icon?: string,
 *    onClick?: (value: string) => void,
 *}} param0 
 */
export default function List({ items, onClick, icon }) {
      /**
       * @param {PointerEvent} event
       */
      function click(event) {
            
            let el = /**@type {HTMLElement}*/(event.target);

            while (!el.hasAttribute('value')) {
                  el = el.parentElement;
            }

            console.log(onClick)
            if (!onClick) {
                  return;
            }

            onClick(el.getAttribute('value'));
      }

      return html`
            <ul class="list-container">
                  ${items.map(v => html`
                        <li 
                              style="display: flex; align-items: center; gap: 10px;"
                              class="item" 
                              value=${v} 
                              @click=${click}
                        >
                              ${icon ? html`<img src=${icon} width="16"/>`: ''}
                              <span>
                                    ${v}
                              </span>
                        </li>`
                  )}
            </ul>
      `
}