import Codes from "../../rendering/rendering/codes.js";
import { SnapshotBuffer } from "../../rendering/rendering/snapshot-buffer.js";
import { toColorVector, EMPTY, COLOR_VEC_SIZE, rgb,  } from "../../rendering/rendering/canvas.js";
import ICanvas from "../../rendering/rendering/canvas.js";
/**@import { Cell  } from "../../rendering/rendering/canvas.js";*/

/**
 * Canvas class for managing a 2D buffer of colored character cells,
 * supporting foreground/background color, depth, and primitive (character) data.
 * 
 * The buffer is designed for terminal-like rendering, where each cell can have
 * a foreground color, background color, character, and depth value for z-ordering.
 * 
 */
export default class TuiCanvas extends ICanvas {
      draw() {
                  
            if (!this.needRedraw()) {
                  return;
            }
            
            const [screen, primitives] = this.getScreen();

            let buffer = '';
            for (let y = 0; y < this.height; y++) {
                  for (let x = 0; x < this.width; x++) {
                        const primitive = primitives[this.getPrimitiveIndex(x, y)];
                        const foreground = this.getForegroundIndex(x,y);
                        const background = this.getBackgroundIndex(x,y);

                        const fg = Codes.Foreground(
                              screen[COLOR_VEC_SIZE*foreground],
                              screen[COLOR_VEC_SIZE*foreground + 1],
                              screen[COLOR_VEC_SIZE*foreground + 2],
                              screen[COLOR_VEC_SIZE*foreground + 3],
                        );
                        const bg = Codes.Background(
                              screen[COLOR_VEC_SIZE*background],
                              screen[COLOR_VEC_SIZE*background + 1],
                              screen[COLOR_VEC_SIZE*background + 2],
                              screen[COLOR_VEC_SIZE*background + 3],
                        );

                        buffer += bg + fg + String.fromCharCode(primitive || EMPTY) + Codes.Reset;
                  }
                  buffer += '\n';
            }
            console.log(Codes.HideCursor + Codes.Clear + Codes.Home + buffer + Codes.ShowCursor);
            this.dirty = false;
      }
}