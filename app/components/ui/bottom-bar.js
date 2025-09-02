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
 *    height?: number,
 *    width?: number,
 *    onClick?: (name: string) => void
 * }} param0 
 */
export function BottomBar({ items, height, width, onClick }) {
      width ||= 100;
      height ||= 100;

      return html`
            <div class="bottom-drawer"  style="z-index: var(--zi-front3);">
                  <div style=${`height: ${height}px;`} class="h-container">
                        ${items.map(item => html`
                        <div 
                              class="file" 
                              style=${`width: ${width}px; height: ${height}px;`} 
                              @click=${() => onClick?.(item.name)}
                        >
                              <img src=${item.image} alt=${item.name} width="32" height="32"/>
                              <span>${item.name.length > 15? item.name.substring(0,14) + '...': item.name}</span>
                        </div>      
                        `)}
                  </div>
            </div>
      `
}