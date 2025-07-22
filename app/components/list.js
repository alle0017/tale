import { html } from "@alle0017!/photonjs";

/**
 * 
 * @param {{
 *    items: string[],
 *    onClick?: (value: string) => void
 *}} param0 
 */
export default function List({ items, onClick, ...props }) {
      console.log(props, onClick)
      /**
       * 
       * @param {HTMLElement} el 
       */
      function click(el) {
            if (!onClick) {
                  return;
            }

            onClick(el.getAttribute('value'));
      }

      return html`
            <ul class="list-container">
                  ${items.map(v => html`
                        <li 
                              class="item" 
                              value=${v} 
                              @click=${click}
                              >
                              ${v}
                        </li>`
                  )}
            </ul>
      `
}