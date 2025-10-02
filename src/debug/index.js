import { GApp, $error, } from "../../node_modules/@alle0017!/photonjs/index.js"
import { useGame, } from "../game/Game.js"
/**@import {Signal} from  "../../node_modules/@alle0017!/photonjs/index.js"*/
/**@import {Entity} from "../ecs/Entity" */
import Collapsable from "./components/collapsable.js";
import ObjectBinder from "./components/object-binder.js";
import TaskWatcher from "./components/task-watcher.js";
import EntityExplorer from "./components/entity-explorer.js";
import ImageWatcher from "./components/image-watcher.js";
import Home from "./components/home.js";
import FrameRate from "./components/frame-rate.js";
import { ChipInput } from "./components/input/chip-input.js";
import ColorPicker from "./components/pixel-editor/color-picker.js";
import CollisionWatcher from "./components/collision-watcher.js";
import Editor from "./components/pixel-editor/editor.js";
import Resizer from "./components/pixel-editor/resizer.js";
import Main, {MAIN, view,} from "./components/main.js";
import DynamicInspector from "./components/dynamic-inspector.js";
//import StaticEditor from "./components/static-editor.js";

function startDebugging() {
      if (startDebugging.initialized) {
            return;
      }
      $error.catch(console.error)

      startDebugging.initialized = true;

      
      GApp
      //.registerComponent(StaticEditor)
      .registerComponent(Resizer)
      .registerComponent(ColorPicker)
      .registerComponent(Editor)
      .registerComponent(CollisionWatcher)
      .registerComponent(FrameRate)
      .registerComponent(ChipInput)
      .registerComponent(Collapsable)
      .registerComponent(ObjectBinder)
      .registerComponent(TaskWatcher)
      .registerComponent(EntityExplorer)
      .registerComponent(ImageWatcher)
      .createRoot(Main)   
      
      MAIN.value = DynamicInspector();
      view.value = Home();
}
startDebugging.initialized = false;
/**#__PURE__ */
export default function Debug() {
      const game = useGame();
      game.worlds.events.on('enter', () => {
            startDebugging();
      })
}
