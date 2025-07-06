import { $ref, html, } from "../fw/index.js";
/**@import Ref from "../fw/lib/Signals/Reference.js";*/

export default function Canvas() {
      /**
       * @type {Ref<HTMLCanvasElement>}
       */
      const canvas = $ref();
      const cvsRoot = $ref();

      cvsRoot.onLoad(cvs => {
            const resizeObserver = new ResizeObserver(entries => {
                  for (const entry of entries) {
                        const { width, height } = entry.contentRect;

                        canvas.element.width = width;
                        canvas.element.height = height;
                  }
            });

            resizeObserver.observe(cvs);
      });


      return html`
            <div ref=${cvsRoot} class="main" style="width: 300px; height: 250px;">
                  <canvas ref=${canvas} width="300" height="250"></canvas>
            </div>
      `
}