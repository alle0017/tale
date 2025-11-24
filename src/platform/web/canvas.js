import { rgb,  } from "../../rendering/rendering/canvas.js";
import ICanvas from "../../rendering/rendering/canvas.js";
/**@import { Cell  } from "../../rendering/rendering/canvas.js";*/

/**
 * Canvas class for managing a 2D buffer of colored character cells,
 * supporting foreground/background color, depth, and primitive (character) data.
 * 
 * The buffer is designed for terminal-like rendering, where each cell can have
 * a foreground color, background color, character, and depth value for z-ordering.
 * This is the web based implementation, that relies on canvas 2D as platform for drawing.
 */
export default class WebCanvas extends ICanvas {
      /**
       * @type {CanvasRenderingContext2D}
       */
      static #CanvasContext;
      static #fontWidth = 12;
      static #fontHeight = 24;

      static get FontWidth() {
            this.#initializeCanvas();
            return this.#fontWidth;
      }
      static get FontHeight() {
            return this.#fontHeight;
      }

      static #initializeCanvas() {
            if (!WebCanvas.#CanvasContext) {
                  const cvs = document.createElement('canvas');

                  document.body.appendChild(cvs);
                  WebCanvas.#CanvasContext = cvs.getContext('2d', { alpha: false });
                  WebCanvas.#CanvasContext.textBaseline = "top";
                  WebCanvas.#CanvasContext.font = `${WebCanvas.#fontHeight}px monospace`;
                  WebCanvas.#fontWidth = WebCanvas.#CanvasContext.measureText('M').width;
            }
      }
      /**
       * @type {CanvasRenderingContext2D}
       */
      #ctx;

      /**
       * 
       * @param {number} width 
       * @param {number} height 
       */
      constructor(width, height) {
            WebCanvas.#initializeCanvas();

            super(width, height);

            const ratio = window.devicePixelRatio;

            this.#ctx = WebCanvas.#CanvasContext;

            this.#ctx.canvas.width = width * WebCanvas.#fontWidth * ratio;
            this.#ctx.canvas.height = height * WebCanvas.#fontHeight * ratio;
            this.#ctx.canvas.style.width = width * WebCanvas.#fontWidth + "px";
            this.#ctx.canvas.style.height = height * WebCanvas.#fontHeight + "px";
            this.#ctx.scale(ratio, ratio);
      }

      draw() {
            
            if (!this.needRedraw()) {
                  return;
            }
            
            const iterator = this.getScreen();
            let x = 0;
            let y = 0;

            this.#ctx.textRendering = "optimizeSpeed";
            this.#ctx.font = `${WebCanvas.#fontHeight}px monospace`;

            while (iterator.hasNext()) {
                  const primitive = iterator.primitive();
                  const foreground = iterator.color();
                  const background = iterator.background();

                  const fg = rgb(
                        foreground[0],
                        foreground[1],
                        foreground[2],
                  );
                  const bg = rgb(
                        background[0],
                        background[1],
                        background[2],
                  );

                  if (bg !== this.#ctx.fillStyle) {
                        this.#ctx.fillStyle = bg;
                  }

                  this.#ctx.fillRect(
                        x*WebCanvas.#fontWidth, 
                        // correction to the height of the pixel
                        y*WebCanvas.#fontHeight + 4, 
                        // correction to the width of the pixel
                        WebCanvas.#fontWidth + 1, 
                        WebCanvas.#fontHeight
                  );

                  if (fg !== this.#ctx.fillStyle) {
                        this.#ctx.fillStyle = fg;
                  }

                  if (fg !== bg) {
                        this.#ctx.fillText(
                              primitive,
                              x * WebCanvas.#fontWidth,
                              (y + 1) * WebCanvas.#fontHeight - 1,
                        );
                  }
                  x++;

                  if (x == this.width) {
                        x = 0;
                        y++;
                  } 
                  iterator.next();
            }
            this.dirty = false;
      }
}