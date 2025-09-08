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
      return html`
            <Collapsable label=${content.name} style="flex-direction: column; gap: 5px;" indent=${15}>
                  ${content.children.map(child => {
                        if (child.children.length > 0) {
                              return Tree({ content: child });
                        }

                        return html`
                              <div class="tooltip hv" @click=${() => onClick?.(child)} style="padding: 2px;"> 
                                    ${child.name} 
                                    <span class="tooltip-text">
                                          ${child.tooltip? child.tooltip: child.name}
                                    </span>
                              </div>
                        `
                  })}
            </Collapsable>
      `
}