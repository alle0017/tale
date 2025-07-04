import Project from "./Project.js";

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

export const useProject = () => Project.project;

/**
 * 
 * @returns {Promise<{img: HTMLImageElement, name: string}>}
 */
export const useImageLoader = () => new Promise((resolve,reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*'
      input.style.opacity = '0';
      input.style.position = 'fixed';
      document.body.appendChild(input);
      input.addEventListener('input', (ev) => {
            const file = input.files[0];
            document.body.removeChild(input);     
            const reader = new FileReader();
            const preview = document.createElement('img');

            reader.onload = e => {
                  preview.src = /**@type {string}*/(e.target.result);
                  preview.onload = () => resolve({ name: file.name, img: preview});
                  preview.onerror = reject;
            };

            reader.readAsDataURL(file);
      }, { once: true })
      input.click();
});