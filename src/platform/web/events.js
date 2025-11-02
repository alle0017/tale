import { Action, buildMouseString } from "../../lib/mouse.js";
import WebCanvas from "./canvas.js";
/**
 * 
 * @param {number} num 
 * @returns 
 */
const toX = num => Math.trunc(num/WebCanvas.FontWidth);
/**
 * 
 * @param {number} num 
 * @returns 
 */
const toY = num => Math.trunc(num/WebCanvas.FontHeight);
/**
 * 
 * @param {(key: string) => void} hook 
 */
export function bootstrap(hook = undefined) {
      let y = 0;
      let mousedown = false;

      window.addEventListener('keypress', event => hook?.(event.key));
      window.addEventListener('mousedown', event => {
            mousedown = true;
            const key = buildMouseString(
                  Action.Click, 
                  toX(event.clientX), 
                  toY(event.clientY), 
                  false
            );
            hook?.(key)
      });
      window.addEventListener('mouseup', event => {
            mousedown = false;
            const key = buildMouseString(
                  Action.Click, 
                  toX(event.clientX), 
                  toY(event.clientY), 
                  true
            );
            hook?.(key)
      });
      window.addEventListener('mouseover', event => {
            const key = buildMouseString(
                  Action.Hover, 
                  toX(event.clientX), 
                  toY(event.clientY), 
                  false
            );
            hook?.(key)
      });


      window.addEventListener('mousemove', event => {
            let action = Action.SwipeDown;

            if (y - event.clientY > 0) {
                  action = Action.SwipeUp;
            }

            if (mousedown) {
                  action = Action.Drag;
            }

            const key = buildMouseString(
                  action, 
                  toX(event.clientX), 
                  toY(event.clientY),  
                  false
            );
            hook?.(key)
      });
}

/**
 * @param {(width: number, height: number) => void} hook
 */
export function onResize(hook) {
      hook(toX(window.innerWidth), toY(window.innerHeight));
      window.addEventListener('resize', () => {
            hook(toX(window.innerWidth), toY(window.innerHeight));
      })
}