import { GApp, html, $error, } from "../../node_modules/@alle0017!/photonjs/index.js"
import { useGame, Game } from "../game/Game.js"
/**@import {Signal} from  "../../node_modules/@alle0017!/photonjs/index.js"*/
/**@import {Entity} from "../ecs/Entity" */
import Collapsable from "./components/collapsable.js";
import ObjectBinder from "./components/object-binder.js";
import TaskWatcher from "./components/task-watcher.js";
import EntityExplorer from "./components/entity-explorer.js";
import ImageWatcher from "./components/image-watcher.js";
import Main, {view} from "./components/main.js";
import Home from "./components/home.js";
import FrameRate from "./components/frame-rate.js";
import { ChipInput } from "./components/input/chip-input.js";
import CollisionWatcher from "./components/collision-watcher.js";
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

      
      GApp
      .registerComponent(CollisionWatcher)
      .registerComponent(FrameRate)
      .registerComponent(ChipInput)
      .registerComponent(Collapsable)
      .registerComponent(ObjectBinder)
      .registerComponent(TaskWatcher)
      .registerComponent(EntityExplorer)
      .registerComponent(ImageWatcher)
      .createRoot(Main)   
      
      view.value = Home();
}
startDebugging.initialized = false;
/**#__PURE__ */
export default function Debug() {
      const game = useGame();
      game.worlds.events.on('enter', () => {
            startDebugging(game);
      })
}
