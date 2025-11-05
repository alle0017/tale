import { EMPTY, COLOR_VEC_SIZE, rgb,  } from "../../rendering/rendering/canvas.js";
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
            
            const [screen, primitives] = this.getScreen();
            this.#ctx.textRendering = "optimizeSpeed";
            this.#ctx.font = `${WebCanvas.#fontHeight}px monospace`;

            for (let y = 0; y < this.height; y++) {
                  for (let x = 0; x < this.width; x++) {
                        const primitive = primitives[this.getPrimitiveIndex(x, y)];
                        const foreground = this.getForegroundIndex(x,y);
                        const background = this.getBackgroundIndex(x,y);

                        const fg = rgb(
                              screen[COLOR_VEC_SIZE*foreground],
                              screen[COLOR_VEC_SIZE*foreground + 1],
                              screen[COLOR_VEC_SIZE*foreground + 2],
                        );
                        const bg = rgb(
                              screen[COLOR_VEC_SIZE*background],
                              screen[COLOR_VEC_SIZE*background + 1],
                              screen[COLOR_VEC_SIZE*background + 2],
                        );

                        this.#ctx.fillStyle = bg;
                        this.#ctx.fillRect(
                              x*WebCanvas.#fontWidth, 
                              // correction to the height of the pixel
                              y*WebCanvas.#fontHeight, 
                              // correction to the width of the pixel
                              WebCanvas.#fontWidth + 1, 
                              WebCanvas.#fontHeight
                        );
                        this.#ctx.fillStyle = fg;
                        this.#ctx.fillText(
                              String.fromCharCode(primitive || EMPTY),
                              x * WebCanvas.#fontWidth,
                              (y + 1) * WebCanvas.#fontHeight - 1,
                        );
                  }
            }
            this.dirty = false;
      }
}