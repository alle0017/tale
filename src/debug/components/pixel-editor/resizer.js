import { html, } from "../../../../node_modules/@alle0017!/photonjs/index.js";
/**@import {VNode, Signal} from "../../../../node_modules/@alle0017!/photonjs/index.js";*/

/**
 * 
 * @param {{
 *    width: number,
 *    height: number,
 *    onChange: (width: number, height: number) => void
 * }} param0 
 * @returns 
 */
export default function Resizer({ width, height, onChange }) {
      
      return html`
            <div style="display: flex; gap: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); font-size: 32px;">
                  <input type="number" style="width: 50px;" value=${width} @change=${e => {
                              width = parseInt(e.target.value, 10);
                              onChange?.(width, height);
                  }}/>
                  <input type="number" style="width: 50px;" value=${height} @change=${e => {
                              height = parseInt(e.target.value, 10);
                              onChange?.(width, height);
                  }}/>
            </div>
      `
}