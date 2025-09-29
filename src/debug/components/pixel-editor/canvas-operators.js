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