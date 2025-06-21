import { createAnimationSystem } from "../../components";

export const use2dRenderingSystem = () => {
      const cvs = document.createElement('canvas');
      const ctx = cvs.getContext('2d');

      document.body.appendChild(cvs);

      cvs.style.imageRendering = 'pixelated';
      cvs.width = document.body.clientWidth;
      cvs.height = document.body.clientHeight;

      

      return createAnimationSystem(/**@param {Array<(context: CanvasRenderingContext2D) => void>} components*/components => {
            for (const comp of components) {
                  comp(ctx);
            }
      });
}

