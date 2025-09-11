import { $ref, $signal, html } from "../../../../node_modules/@alle0017!/photonjs/index.js";
/**@import { VNode, Ref } from "../../../../node_modules/@alle0017!/photonjs/index.js";*/

/**
 * 
 * @param {{
 * onChange?: (value: string[]) => void,
 * value?: string[]
 * }} param0 
 */
export function ChipInput({ onChange, value }) {
      const $value = $signal(value || []);
      /**@type {Ref<HTMLInputElement>} */
      const ref = $ref();

      return html`
            <div style="display: flex; flex-direction: column; gap: 10px;">
                  <b>tags</b>
                  <div style="display: grid; column-gap: 5px; row-gap: 10px; grid-template-columns: 100px 100px 100px; width: 300px;">
                        ${$value.map(value => html`
                              <span style="padding: 5px; border-radius: 30px; background-color: var(--bg2); width: 80px; display: flex; gap: 20px; align-items: center; justify-content: center;">
                                    ${value.length > 7 ? `${value.substring(0,4)}...`: value}
                                    <span @click=${() => $value.set($value.value.filter(v => v !== value))} style="display: flex; align-items: center; justify-content: center; font-size: 20px; width: 18px; height: 18px; text-align: center; border-radius: 50% !important;" class="hv">
                                          x
                                    </span>
                              </span>
                        `)}
                  </div>
                  <div style="display: flex; gap: 10px;">
                        <input type="text" value="" ref=${ref.bind}/>
                        <button @click=${() => {
                              if (!ref.element.value) {
                                    return;
                              }
                              $value.set($value.value.concat([ref.element.value]));
                              ref.element.value = '';
                        }} style="font-size: 20px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                              +
                        </button>
                  </div>
            </div>
      `
}