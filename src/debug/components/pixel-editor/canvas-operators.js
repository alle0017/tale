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
export function drawLayer(ctx, layer, width, height) {
      ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

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
 * @param {string[][]} matrix 
 * @param {number} x 
 * @param {number} y 
 * @param {string} value 
 */
function setPixel(matrix, x, y, value) {
      if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
            matrix[y][x] = value;
      }
}

/**
 * 
 * @param {string[][]} matrix 
 * @param {number} cx 
 * @param {number} cy 
 * @param {number} r 
 * @param {string} value 
 * @returns 
 */
export function drawCircle(matrix, cx, cy, r, value) {
      if (r < 0) {
            return;
      }
      const steps = Math.max(8, Math.ceil(2 * Math.PI * r * 1.2)); // ~circumference sampling
      for (let i = 0; i < steps; i++) {
            const a = (i / steps) * 2 * Math.PI;
            const x = Math.round(cx + r * Math.cos(a));
            const y = Math.round(cy + r * Math.sin(a));
            setPixel(matrix, x, y, value);
      }
}