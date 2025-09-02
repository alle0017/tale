import { html } from "@alle0017!/photonjs";
/**
 * 
 * @param {{ attribs: Attribute[] }} param0 
 */
export function AttributeList({ attribs }) {
      return attribs.map(attrib => {
            if ('children' in attrib) {
                  return html`
                        <span style="height: 16px; border-bottom: var(--border1);">${attrib.name}</span>
                        ${AttributeList({ attribs: attrib.children })}
                  `
            }
            return html`<Input label=${attrib.name} type=${attrib.type}/>`
      })
}
/**
 * 
 * @param {{ entity: EntityInstance }} param0 
 */
export function ComponentsAccordion({ entity }) {
      return html`
            <ul>
                  ${entity.components.map(comp => html`
                        <li 
                              class="accordion-trigger"
                              style="height: 16px; overflow: hidden; display: flex; flex-direction: column; gap: 10px; width: max-content;" 
                              @click=${/**@param {PointerEvent} e */e => {
                                    let el = /**@type {HTMLElement}*/(e.target);

                                    if (!el.classList.contains('accordion-trigger')) {
                                          return;
                                    }

                                    while (el.nodeName.toLowerCase() != 'li') {
                                          el = el.parentElement;
                                    }
                                    
                                    el.style.height = el.style.height == 'max-content' ? '16px' : 'max-content'
                              }}
                        >
                              <span style="height: 16px; border-bottom: var(--border1);" class="accordion-trigger">
                                    ${comp.name}
                              </span>
                              ${AttributeList({ attribs: comp.attributes })}
                        </li>
                  `)}
            </ul>
      `
}