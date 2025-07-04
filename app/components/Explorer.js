import { html, Signal } from "../fw/index.js";

/**
 * create a bottom explorer,
 * that contains all items of a type
 * @param {{
 *  onCreate: () => void,
 *  onOpen: (name: string) => void,
 *  icon: string | Signal<string>,
 *  items: string[] | Signal<string[]>,
 * }} param0 
 */
export default function Explorer({
      onCreate,
      onOpen,
      icon,
      items,
}) {
      return html`
            <div class="bottom-drawer">
                  <ul class="up-bar-secondary navbar">
                        <li class="sm-item" @click=${onCreate}>
                              <img src="./icons/plus.svg" width="16"/>
                        </li>
                        <li class="sm-item sc-11">
                              <img src="./icons/x.svg" width="16"/>
                        </li>
                  </ul>
                  <div class="h-container">
                        ${items.map(v => html`
                              <div class="v-container g-1">
                                    <div class="file" @click=${() => onOpen(v)}>
                                          <img src=${icon} width="32"/>
                                    </div>
                                    <span>
                                          ${v}
                                    </span>
                              </div>
                              `
                        )}
                  </div>
            </div>
      `
}