import { $ref, $signal, html } from "@alle0017!/photonjs";
import { TYPES } from "./type";
/**
 * 
 * @param {{
 *    label?: string,
 *    value?: import("@alle0017!/photonjs").Signal<string>
 *    type?: 'string' | 'number'
 * }} param0 
 */
export function TypedInput({ label, }) {
      /**
       * @type {import("@alle0017!/photonjs").Ref<{ value: string }>}
       */
      const ref = $ref();
      const input = $signal(TYPES.number.input(ref));

      return html`
            <div style="display: flex; gap: 10px; align-items: center; width: 400px;">
                  <label for=${label} style="width: 70px;">${label}</label>
                  <select class="inline-input" @change=${e => {
                        const type = TYPES[e.target.value];
                        input.value = type.input(ref);
                        ref.element.value = type.default;
                  }}>
                        ${Object.keys(TYPES).map(key => html`<option value=${key}>${key}</option>`)}
                  </select>
                  ${input}
            </div>
      `;
}