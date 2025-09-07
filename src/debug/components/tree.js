import { $ref, $signal, html, } from "../../../node_modules/@alle0017!/photonjs/index.js";
/**@import {Ref,VNode} from "../../../node_modules/@alle0017!/photonjs/index.js";*/


/**
 * @template {{}} T
 * @typedef {{ 
 *    name: string, 
 *    tooltip?: string,
 *    children: Tree<T>[],
 *    data?: T,
 *}} Tree
 */
/**
 * @template T
 * @param {{
 *    content: Tree<T>,
 *    onClick?: (child: Tree<T>) => void
 * }} param0 
 * @returns {VNode<HTMLElement>[]}
 */
export default function Tree({ content, onClick }) {
      const CLOSE = `▶ ${content.name} ...`;
      const OPEN = `▼ ${content.name}`;
      const label = $signal(OPEN);
      /**@type {Ref<HTMLElement>} */
      const ul = $ref();
      return html`
            <li 
                  style="font-weight: bolder;" 
                  class="parent tooltip tree" 
                  @click=${() => {
                        if (label.value === OPEN) {
                              ul.element.style.display = 'none';
                              label.value = CLOSE;
                        } else {
                              ul.element.style.display = 'flex';
                              label.value = OPEN;
                        }
                  }}
            >
                  ${label}
            </li>
            <ul ref=${ul.bind} class="tree">
                  ${content.children.map(child => {
                        if (child.children.length > 0) {
                              return Tree({ content: child });
                        }

                        return html`
                              <li class="tooltip hv" @click=${() => onClick?.(child)}> 
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