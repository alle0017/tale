/**
 * @typedef {{ 
 *    name: string, 
 *    image: string
 *}} Item
 */

import { html } from "@alle0017!/photonjs";

/**
 * 
 * @param {{
 *    items: Item[]
 *    height: number,
 *    width: number,
 * }} param0 
 */
export function BottomBar({ items, height, width }) {
      return html`
            <div class="bottom-drawer">
                  <div style=${`height: ${height}px;`} class="h-container">
                        ${items.map(item => html`
                        <div class="file" style=${`width: ${width}px; height: ${height}px;`}>
                              <img src=${item.image} alt=${item.name} style=${`width: ${width}px; height: ${height}px;`}/>
                              <span>${item.name.length > 15? item.name.substring(0,14) + '...': item.name}</span>
                        </div>      
                        `)}
                  </div>
            </div>
      `
}