import { html } from "../../../../node_modules/@alle0017!/photonjs/index.js";
/**@import {Ref,VNode} from "@alle0017!/photonjs"*/
/**
 * @typedef {{ 
 *    value: string, 
 *    addEventListener(ev: 'change', callback: (e: Event) => void): void 
 *    disabled: boolean,
 *    setAttribute(name: string, value: string): void
 * }} InputRef 
 */
/**
 * @type {Record<string, { 
 *    input: (ref: Ref<InputRef>) => VNode<HTMLElement>[], 
 *    default: string,
 *    converter: (value: string) => unknown
 * }>}
 */
export const TYPES = {
      number: { 
            input: ref => html`<input type="number" ref=${ref.bind} class="inline-input" value="0.0"/>`,
            default: '0.0',
            converter: parseFloat
      },
      string: {
            input: ref => html`<input type="text" class="inline-input" ref=${ref.bind}/>`,
            default: '',
            converter: v => v
      },
      boolean: {
            input: ref => html`
                  <select value="true" ref=${ref.bind} class="inline-input">
                        <option value="true">true</option>
                        <option value="false">false</option>
                  </select>
            `,
            default: 'true',
            converter: str => str === 'true'
      },
      json: {
            input: ref => html`<textarea value="{}" ref=${ref.bind}></textarea>`,
            default: '{}',
            converter: JSON.parse
      }
};
