/**
 * get the coordinates in matrix form from the event
 * of click on canvas. 
 * @param {MouseEvent} event 
 * @param {number} width - of a single block (a.k.a pixel)
 * @param {number} height - of a single block (a.k.a pixel)
 * @returns {[number, number]} - [x,y]
 */
export function toCanvasCoordinates(event, width, height) {
      const cvs = /**@type {HTMLCanvasElement} */(event.target);
      const rect = cvs.getBoundingClientRect();
      const x = (event.x - rect.x)*cvs.width/rect.width;
      const y = (event.y - rect.y)*cvs.height/rect.height;

      return [
            Math.floor(x/width),
            Math.floor(y/height)
      ];
}
/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string[][]} layer 
 * @param {number} width 
 * @param {number} height 
 */
export function drawGrid(ctx, layer, width, height) {

      for (let i = 0; i < layer.length; i++) {
            for (let j = 0; j < layer[i].length; j++) {
                  ctx.fillStyle = (i + j)%2 ? '#fff' : '#aaa';
                  ctx.fillRect(
                        i*width,
                        j*height,
                        width,
                        height
                  );
            }
      }
}     
/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string[][]} layer 
 * @param {number} width 
 * @param {number} height 
 */
export function drawLayer(ctx, layer, width, height, grid = true) {
      ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

      if (grid) {
            drawGrid(ctx, layer, width, height);
      }
      for (let i = 0; i < layer.length; i++) {
            for (let j = 0; j < layer[i].length; j++) {
                  ctx.fillStyle = (i + j)%2 ? '#fff' : '#aaa';
                  ctx.fillRect(
                        i*width,
                        j*height,
                        width,
                        height
                  );
            }
      }

      for (let i = 0; i < layer.length; i++) {
            for (let j = 0; j < layer[i].length; j++) {
                  ctx.fillStyle = layer[i][j];
                  ctx.fillRect(
                        i*width,
                        j*height,
                        width,
                        height
                  );
            }
      }
}     

/**
 * set a pixel in safe way
 * @template T
 * @param {T[][]} matrix 
 * @param {number} x 
 * @param {number} y 
 * @param {T} value 
 */
function setPixel(matrix, x, y, value) {
      if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
            matrix[y][x] = value;
      }
}

/**
 * @template T
 * @param {T[][]} matrix 
 * @param {number} cx 
 * @param {number} cy 
 * @param {number} r 
 * @param {T} value 
 * @returns 
 */
export function drawCircle(matrix, cx, cy, r, value) {
      if (r < 0) {
            return matrix;
      }
      const steps = Math.max(8, Math.ceil(2 * Math.PI * r * 1.2)); // ~circumference sampling
      for (let i = 0; i < steps; i++) {
            const a = (i / steps) * 2 * Math.PI;
            const x = Math.round(cx + r * Math.cos(a));
            const y = Math.round(cy + r * Math.sin(a));
            setPixel(matrix, x, y, value);
      }
      return matrix;
}

/**
 * @template T
 * @param {T[][]} matrix 
 * @param {number} x0 
 * @param {number} y0 
 * @param {number} x1 
 * @param {number} y1 
 * @param {T} value 
 */
function plotLineLow(matrix, x0, y0, x1, y1, value) {
      let dx = x1 - x0;
      let dy = y1 - y0;
      let yi = 1;
      if (dy < 0) {
            yi = -1;
            dy = -dy;
      }

      let D = (2 * dy) - dx;
      let y = y0;

      for (let x = x0; x <= x1; x++) {
            setPixel(matrix, x, y, value);
            if (D > 0) {
                  y = y + yi;
                  D = D + (2 * (dy - dx));
            } else {
                  D = D + 2*dy;
            }
      }
}
/**
 * @template T
 * @param {T[][]} matrix 
 * @param {number} x0 
 * @param {number} y0 
 * @param {number} x1 
 * @param {number} y1 
 * @param {T} value 
 */
function plotLineHigh(matrix, x0, y0, x1, y1, value) {
      let dx = x1 - x0;
      let dy = y1 - y0;
      let xi = 1;
      if (dx < 0) {
            xi = -1;
            dx = -dx;
      }

      let D = (2 * dx) - dy;
      let x = x0;

      for (let y = y0; y <= y1; y++) {
            setPixel(matrix, x, y, value);
            if (D > 0) {
                  x = x + xi;
                  D = D + (2 * (dx - dy));
            } else {
                  D = D + 2*dx;
            }
      }
}
/**
 * @template T
 * @param {T[][]} matrix 
 * @param {number} ax 
 * @param {number} ay 
 * @param {number} bx 
 * @param {number} by 
 * @param {T} value 
 */
export function drawLine(matrix, ax, ay, bx, by, value) {
      if (matrix.length < 1 || matrix[0].length < 1) {
            return matrix;
      }

      if (Math.abs(by - ay) < Math.abs(bx - ax)) {
            if (ax > bx) {
                  const cx = ax;
                  const cy = ay;

                  ax = bx;
                  ay = by;
                  bx = cx;
                  by = cy;
            }
            plotLineLow(matrix, ax, ay, bx, by, value);
      } else {
            if (ay > by) {
                  const cx = ax;
                  const cy = ay;

                  ax = bx;
                  ay = by;
                  bx = cx;
                  by = cy;
            }
            plotLineHigh(matrix, ax, ay, bx, by, value);
      }


      return matrix;
}