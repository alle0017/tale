import { $signal, html, } from "../../../../node_modules/@alle0017!/photonjs/index.js";
/**@import {VNode, Signal} from "../../../../node_modules/@alle0017!/photonjs/index.js";*/
/**
 * 
 * @param {{
 * onSelect?: (color: string) => void
 * }} param0 
 */
export default function ColorPicker({ onSelect }) {
      /**
       * @type {Signal<string[]>}
       */
      const stack = $signal([]);
      /**
       * 
       * @param {string} value 
       */
      const append = value => {
            stack.value.push(value);
            if (stack.value.length > 16) {
                  stack.value.shift();
            }
            stack.set(stack.value);
            onSelect?.(value);
      }

      return html`
            <div style="height: 50%; width: 200px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                  <input type="color" @change=${e => append(e.target.value)} alpha=${true}/>
                  <div style="display: grid; grid-template-columns: auto auto; row-gap: 20px;">
                        ${stack.map(color => html`
                              <div @click=${() => onSelect?.(color)} style=${`background-color: ${color}; width: 48px; height: 48px;`}></div>
                        `)}   
                  </div>
            </div>
      `
}