import { html, $signal, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import { useTaskManager } from "../../ecs/TaskManager.js";
import { useGame } from "../../game/Game.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/

export const view = $signal(html``);
export default function FrameRate() {
      const fps = $signal(30);
      const game = useGame();
      /**@type {() => boolean} */

      game.worlds.events.on('enter', () => {
            let then = performance.now();
            let breakpoint = then;

            useTaskManager().addAnimationTask(() => {
                  const now = performance.now();

                  if (now - breakpoint < 150) {
                        then = now;
                        return;
                  }
                  
                  fps.value = Math.trunc(1000/(now-then));
                  then = now;
                  breakpoint = now;
            })
      })
      return html`
            <div style="height: 20px; position: fixed; top: 1%; width: 300px; left: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                  Frame rate: ${fps} fps
            </div>
      `
}