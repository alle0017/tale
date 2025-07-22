import { $ref, $signal, html, } from "@alle0017!/photonjs";
/**@import {Ref} from "@alle0017!/photonjs";*/


/**
 * @typedef {{ 
 *    name: string, 
 *    tooltip?: string,
 *    children: Tree[]
 *}} Tree
 */
/**
 * 
 * @param {{
 *    content: Tree
 * }} param0 
 */
export default function Tree({ content }) {
      const CLOSE = `▶ ${content.name} ...`;
      const OPEN = `▼ ${content.name}`;
      const label = $signal(OPEN);
      /**@type {Ref<HTMLElement>} */
      const ul = $ref();
      return html`
            <style>
                  ul {
                        list-style-type: none;
                        text-indent: 5px;
                        padding-inline-start: 20px;
                  }
                  li {
                        width: 200px;
                        height: 18px;
                        padding: 5px;
                        border-radius: 7px;
                        list-style-type: none;
                  }
                  li:hover {
                        background-color: var(--n1);
                        cursor: pointer;
                  }
            </style>
            <li 
                  style="font-weight: bolder;" 
                  class="parent tooltip" 
                  @click=${() => {
                        if (label.value === OPEN) {
                              ul.element.style.display = 'none';
                              label.value = CLOSE;
                        } else {
                              ul.element.style.display = 'block';
                              label.value = OPEN;
                        }
                  }}
            >
                  ${label}
            </li>
            <ul ref=${ul.bind}>
                  ${content.children.map(child => {
                        if (child.children.length > 0) {
                              return Tree({ content: child });
                        }

                        return html`
                              <li class="tooltip"> 
                                    ${child.name} 
                                    <span class="tooltip-text">
                                          ${child.tooltip? child.tooltip: child.name}
                                    </span>
                              </li>
                        `
                  })}
            </ul>
      `
}