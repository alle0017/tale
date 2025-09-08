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
 *    label: string,
 *    children: unknown,
 *    style?: string,
 *    indent?: number,
 *    collapse?: string,
 *    expand?: string,
 * }} param0 
 * @returns {VNode<HTMLElement>[]}
 */
export default function Collapsable({ label, children, style, indent, collapse, expand }) {
      collapse ||= '▼';
      expand ||= '▶';

      const CLOSE = `${expand} ${label} ...`;
      const OPEN = `${collapse} ${label}`;
      const header = $signal(OPEN);
      /**@type {Ref<HTMLElement>} */
      const content = $ref();

      style ||= '';

      return html`
            <div 
                  style="font-weight: bolder; margin-bottom: 5px;" 
                  @click=${() => {
                        if (header.value === OPEN) {
                              content.element.style.display = 'none';
                              header.value = CLOSE;
                        } else {
                              content.element.style.display = 'flex';
                              header.value = OPEN;
                        }
                  }}
            >
                  ${header}
            </div>
            <div ref=${content.bind} style=${`display: flex; margin-left: ${indent || 0}px;${style}`}>
                  ${children}
            </div>
      `
}