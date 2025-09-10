import { $ref, $signal, html } from "../../../../node_modules/@alle0017!/photonjs/index.js";
import { TYPES } from "./type.js";
/**@import {InputRef} from "./type" */
/**@import { VNode } from "../../../../node_modules/@alle0017!/photonjs/index.js";*/
/**
 * 
 * @param {{
 *    label?: string,
 *    type?: keyof TYPES,
 *    onChange?: (value: unknown) => void,
 *    value?: string,
 *    disabled?: boolean,
 *    style?: string
 * }} param0 
 */
export function Input({ label, type, onChange, value, disabled, style }) {
      /**
       * @type {import("@alle0017!/photonjs").Ref<InputRef>}
       */
      const ref = $ref();
      const input = $signal(TYPES[type].input(ref));
      ref.onLoad(el => {
            el.value = value || TYPES[type].default;
            el.setAttribute('value', value)
            el.disabled = disabled || typeof disabled === 'boolean';
            el.setAttribute('style', style);
            if (!onChange) {
                  return;
            }
            el.addEventListener('change', () => {
                  try {
                        const value = TYPES[type].converter(el.value);
                        onChange(value);
                  } catch (e) {
                        console.error(e);
                  }
            });
      });

      return html`
            <div style="display: flex; gap: 10px; align-items: center; width: 450px;">
                  <label for=${label} style="width: 100px;" class="tooltip">
                        ${label.length > 13 ? `${label.slice(0, 10)}...`: label}
                        <span class="tooltip-text">
                              ${label}
                        </span>
                  </label>
                  ${input}
            </div>
      `;
}