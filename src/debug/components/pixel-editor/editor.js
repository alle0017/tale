import { $signal, html, } from "../../../../node_modules/@alle0017!/photonjs/index.js";
import ImmutableCanvas from "./immutable-canvas.js";
import { drawLayer, toCanvasCoordinates } from "./canvas-operators.js";
/**@import {VNode, Signal} from "../../../../node_modules/@alle0017!/photonjs/index.js";*/

export default function Editor() {
      /**
       * @type {ImmutableCanvas<string>}
       */
      const layer = new ImmutableCanvas();
      /**
       * @type {CanvasRenderingContext2D}
       */
      let ctx;
      let select = '#000';
      let width = 32;
      let height = 32;

      layer.events.on('statechange', () => {
            drawLayer(ctx, layer.state, width, height);
      });
      /**
       * @param {HTMLCanvasElement} cvs
      */
     const pickContext = cvs => {
           ctx = cvs.getContext('2d');
           layer.resize(16, 16, '#fff');
      };
      /**
       * 
       * @param {MouseEvent} e 
       */
      const onCanvasClicked = e => {
            const [i,j] = toCanvasCoordinates(e, width, height);
            layer.insert(select, i, j);
      };

      return html`
            <div style="display: flex; gap: 10px; position: absolute; top: 10%; height: 100%;">
                  <ColorPicker @select=${value => (select = value)}/>
                  <canvas width=${512} height=${512} style="width: 512px; height: 512px;" ref=${pickContext} @mousedown=${onCanvasClicked}></canvas>
            </div>
      `
}