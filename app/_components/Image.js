import { $ref, $signal, $watcher, createContext, html, Signal } from "../fw";

export const useImage = createContext({
      /**
       * @type {Signal<HTMLImageElement>}
       */
      img: $signal(undefined),
});

export default function Image() {
      const img = useImage().img;

      return html`
            <div style="width: 500px; height: 440px;">
                  <img src=${img.map(val => val?.src || '')} height="440"/>
            </div>`;
}     