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
            
            const iterator = this.getScreen();

            let x = 0;
            let y = 0;
            let buffer = '';

            while (iterator.hasNext()) {
                  const primitive = iterator.primitive();
                  const foreground = iterator.color();
                  const background = iterator.background();

                  const fg = Codes.Foreground(
                        foreground[0],
                        foreground[1],
                        foreground[2],
                        foreground[3]
                  );
                  const bg = Codes.Background(
                        background[0],
                        background[1],
                        background[2],
                        background[3],
                  );
                  buffer += bg + fg + primitive + Codes.Reset;

                  x++;

                  if (x == this.width) {
                        x = 0;
                        buffer += '\n';

                        y++;
                  } 
                  iterator.next();
            }
            console.log(Codes.HideCursor + Codes.Clear + Codes.Home + buffer + Codes.ShowCursor);
            this.dirty = false;
      }
}