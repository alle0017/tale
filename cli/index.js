import { useWorld, useGame } from "../src/index.js";
import { createRoot, } from "../src/layout.js";
import Editor from "./components/editor.js";
import { writeFile, fileExists, createDir, readFile } from "./filesystem/index.js";
/**@import {HexColor} from "../src/rendering/rendering/canvas" */
import { Actions, BIOME, DESIGN_FILE, DENO_POLYFILL_JS, INDEX_JS, TSCONFIG, FILESYSTEM_LIB } from "./constants.js";


export default function MainScene() {
      const scene = useWorld();

      //@ts-ignore
      const func = Deno.args[0];

      switch (func) {
            case Actions.New.name: {
                  createDir('assets');
                  createDir('src/scenes');
                  createDir('src/components');
                  createDir('src/entities');
                  createDir('src/layout');
                  writeFile(`src/index.js`, INDEX_JS);
                  writeFile(`src/filesystem.js`, FILESYSTEM_LIB);
                  writeFile(`src/polyfill.js`, DENO_POLYFILL_JS);
                  writeFile(`tsconfig.json`, TSCONFIG);
                  writeFile(`biome.json`, BIOME);
                  writeFile(`README.md`, DESIGN_FILE);
            } break;
            case Actions.Canvas.name: {
                  createRoot(Editor({ 
                        async onSave(cvs) {
                              let idx = 0;
                              await createDir('assets')
                              while(await fileExists(`assets/image-${idx}.json`)) {
                                    idx++;
                              }
                              writeFile(`assets/image-${idx}.json`, JSON.stringify(cvs))
                        }
                  }), scene);
            } break;
            default: {
                  console.log(`\x1b[1mHELP\x1b[0m\n\nthis is a list of all commands that tale CLI expose. They are a set of tools useful to build a game from scratch\n\n`);

                  for (const action of Object.values(Actions)) {
                        console.log(`\x1b[4m${action.name}\x1b[0m\t\t${action.description}`);
                  }
            } break;
      }
      

      return scene;
}

const REFRESH_RATE = 16;
(function() {
      /**
       * 
       * @param {FrameRequestCallback} callback 
       * @returns 
       */
      globalThis.requestAnimationFrame = callback => {
            const id = setTimeout(() => callback(REFRESH_RATE), REFRESH_RATE); 
            return id;
      };
      /**
       * 
       * @param {IdleRequestCallback} callback 
       * @returns 
       */
      globalThis.requestIdleCallback = callback => {
            const id = setTimeout(() => callback(null), REFRESH_RATE*2); 
            return id;
      };
 
      globalThis.cancelAnimationFrame = function(id) {
            clearTimeout(id);
      };
      globalThis.cancelIdleCallback = function(id) {
            clearTimeout(id);
      };
}());
useGame().worlds.use(MainScene());