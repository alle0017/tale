import { $ref, $signal, html } from "@alle0017!/photonjs";
import { TYPES } from "./type";
/**
 * 
 * @param {{
 *    label?: string,
 *    type?: keyof TYPES
 * }} param0 
 */
export function Input({ label, type }) {
      /**
       * @type {import("@alle0017!/photonjs").Ref<{ value: string }>}
       */
      const ref = $ref();
      const input = $signal(TYPES[type].input(ref));

      return html`
            <div style="display: flex; gap: 10px; align-items: center; width: 400px;">
                  <label for=${label} style="width: 70px;">${label}</label>
                  ${input}
            </div>
      `;
}