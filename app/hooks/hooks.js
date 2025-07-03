/**
 * @param {string} cssClass 
 */
export const useActive = cssClass => {
      /**@type {HTMLElement} */
      let active;

      return /**@param {Event} e */e => {
            if (active) {
                  active.classList.remove(cssClass);
            }

            active = /**@type {HTMLElement} */(e.target);
            active.classList.add(cssClass);
      }
}