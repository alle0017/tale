import { $watcher } from "@alle0017!/photonjs";
/**@import {Signal} from "@alle0017!/photonjs";*/

/**
 * @param {Signal<string>} signal 
 */
export const model = signal => {
      /**
       * @param {HTMLInputElement} el
       */
      return el => {
            el.setAttribute('value', signal.value);
            el.addEventListener('change', () => {
                  signal.value = el.value;
            });
            $watcher(() => {
                  el.setAttribute('value', signal.value);
            }, signal);
      }
}