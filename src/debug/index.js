import { GApp, html, $error, } from "../../node_modules/@alle0017!/photonjs/index.js"
import { useGame, Game } from "../game/Game.js"
/**@import {Signal} from  "../../node_modules/@alle0017!/photonjs/index.js"*/
/**@import {Entity} from "../ecs/Entity" */
import css from "./components/css.module.js";
import Collapsable from "./components/collapsable.js";
import ObjectBinder from "./components/object-binder.js";
import TaskWatcher from "./components/task-watcher.js";
import EntityExplorer from "./components/entity-explorer.js";
import { useTaskManager } from "../ecs/TaskManager.js";
/**
 * 
 * @param {Game} game 
 */
function startDebugging(game) {
      if (startDebugging.initialized) {
            return;
      }
      $error.catch(console.error)

      startDebugging.initialized = true;

      game.worlds.events.on('enter', () => {
            useTaskManager().addTask(() => 2)
      })
      GApp
      .registerComponent(Collapsable)
      .registerComponent(ObjectBinder)
      .registerComponent(TaskWatcher)
      .registerComponent(EntityExplorer)
      .createRoot(() => html`
            <style>${css}</style>
            <div style="height: 80%; position: fixed; top: 10%; width: 300px; left: 10px; color: var(--color); background-color: var(--bg); border-radius: 7px; padding: 10px; border: 1px solid var(--bg2); display: flex; flex-direction: column; gap: 20px; overflow-y: scroll; overflow-x: hidden;">
                  <EntityExplorer/>
                  <TaskWatcher/>
            </div>
      `)   
}
startDebugging.initialized = false;
/**#__PURE__ */
export default function Debug() {
      const game = useGame();
      game.worlds.events.on('enter', () => {
            startDebugging(game);
      })
}
