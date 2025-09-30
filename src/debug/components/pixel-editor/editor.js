import { $effect, $signal, html, } from "../../../../node_modules/@alle0017!/photonjs/index.js";
import ImmutableCanvas from "./immutable-canvas.js";
import { drawCircle, drawLayer, toCanvasCoordinates } from "./canvas-operators.js";
/**@import {VNode, Signal} from "../../../../node_modules/@alle0017!/photonjs/index.js";*/

export default function Editor() {
      const NULL = '#fff0';
      /**
       * @type {ImmutableCanvas<string>}
       */
      const layer = new ImmutableCanvas();
      /**
       * @type {CanvasRenderingContext2D}
       */
      let ctx;
      let select = '#000';
      const width = 32;
      const height = 32;
      const cvswidth = $signal(0);
      const cvsheight = $signal(0);
      
      $effect(() => {
            if (ctx) {
                  ctx.canvas.width = cvswidth.value * width;
                  ctx.canvas.height = cvsheight.value * height;
            }

            layer.resize(cvswidth.value,cvsheight.value, NULL);
      }, cvswidth, cvsheight);

      layer.events.on('statechange', () => {
            drawLayer(ctx, layer.state, width, height);
      });

      /**
       * @param {HTMLCanvasElement} cvs
      */
      const pickContext = cvs => {
           ctx = cvs.getContext('2d');
           cvswidth.value = 16;
           cvsheight.value = 16;
      };
      /**
       * 
       * @type {(e: MouseEvent) => void}
      */
      const pen = e => {
           const [i,j] = toCanvasCoordinates(e, width, height);
           layer.insert(select, i, j);
      };
      /**
       * first event used when the user clicks on the canvas.
       * it selects the center
       * @type {(e: MouseEvent) => void}
      */
      const circleStart = e => {
            const [i,j] = toCanvasCoordinates(e, width, height);
            canvasClickedHandler = ev => {
                  const [x,y] = toCanvasCoordinates(ev, width, height);
                  const rx = x - i;
                  const ry = y - j;

                  const radius = Math.floor((rx * rx + ry * ry) ** 0.5);

                  layer.execute(matrix => drawCircle(matrix, j, i, radius, select));
                  canvasClickedHandler = circleStart;
            };
      };
      /**
       * 
       * @type {(e: MouseEvent) => void}
      */
      let canvasClickedHandler = pen;
      /**
       * 
       * @param {MouseEvent} e 
       */
      const onCanvasClicked = e => canvasClickedHandler?.(e);

      return html`
            <div style="display: flex; gap: 10px; position: absolute; top: 10%; height: 100%;">
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; gap: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); font-size: 32px;">
                              <div @click=${() => layer.undo()} class="hv" style="padding: 2px 5px;">
                                    ↩
                              </div>
                              <div @click=${() => {canvasClickedHandler = pen; select = NULL;}} class="hv" style="padding: 1px 5px;">
                                    ⌫
                              </div>
                              <div @click=${() => canvasClickedHandler = circleStart} class="hv" style="padding: 1px 5px;">
                                    ○
                              </div>
                              <div @click=${() => canvasClickedHandler = pen} class="hv" style="padding: 1px 5px;">
                                    ✎
                              </div>
                        </div>
                        <Resizer width=${16} height=${16} @change=${(width, height) => {
                              cvswidth.value = width;
                              cvsheight.value = height;
                        }}/>
                        <ColorPicker @select=${value => (select = value)}/>
                  </div>
                  <canvas 
                        width=${512} 
                        height=${512} 
                        style="width: 512px; height: 512px;" 
                        ref=${pickContext} 
                        @mousedown=${onCanvasClicked}
                  ></canvas>
            </div>
      `
}