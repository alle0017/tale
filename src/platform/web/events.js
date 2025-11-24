import { Action, buildMouseString } from "../../lib/mouse.js";
import WebCanvas from "./canvas.js";
/**
 * 
 * @param {number} num 
 * @returns 
 */
const toX = num => Math.trunc(num/WebCanvas.FontWidth) - 1;
/**
 * 
 * @param {number} num 
 * @returns 
 */
const toY = num => Math.round(num/WebCanvas.FontHeight) - 1;
/**
 * 
 * @param {(key: string) => void} hook 
 */
export function bootstrap(hook = undefined) {
      let y = 0;
      let mousedown = false;
      let drag = false;

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
            const key = buildMouseString(
                  drag ? Action.Drag : Action.Click, 
                  toX(event.clientX), 
                  toY(event.clientY), 
                  true
            );
            hook?.(key)

            mousedown = false;
            drag = false;
      });
      window.addEventListener('mousemove', event => {
            const key = buildMouseString(
                  Action.Hover, 
                  toX(event.clientX), 
                  toY(event.clientY), 
                  false
            );
            hook?.(key)
      });

      window.addEventListener('dragstart', (event) => {
            const key = buildMouseString(
                  Action.Drag, 
                  toX(event.clientX), 
                  toY(event.clientY),  
                  false
            );
            hook?.(key)
      })
      window.addEventListener('mousemove', event => {
            let action = Action.SwipeDown;

            if (y - event.clientY > 0) {
                  action = Action.SwipeUp;
            }

            if (mousedown) {
                  action = Action.Drag;
                  drag = true;
            }

            const key = buildMouseString(
                  action, 
                  toX(event.clientX), 
                  toY(event.clientY),  
                  false
            );
            hook?.(key)
      });
      window.addEventListener('keydown', event => hook?.(event.key.toLowerCase()))
}

/**
 * @param {(width: number, height: number) => void} hook
 */
export function onResize(hook) {
      hook(toX(window.innerWidth) - 1, toY(window.innerHeight));
      window.addEventListener('resize', () => {
            hook(toX(window.innerWidth) - 1, toY(window.innerHeight));
      })
}