import { html } from "@alle0017!/photonjs";
/**
 * @type {Record<string, { 
 *    input: (ref: import("@alle0017!/photonjs").Ref<{ value: string }>) => import("@alle0017!/photonjs").VNode<HTMLElement>[], 
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
            input:ref => html`<input type="text" class="inline-input" ref=${ref.bind} value=""/>`,
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
