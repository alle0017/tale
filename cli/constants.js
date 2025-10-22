/**
 * @enum {{ name: string, description: string }}
 */
export const Actions = {
      New: {
            name: 'new',
            description: 'create a new project'
      },
      Canvas: {
            name: 'canvas',
            description: `open terminal based pixel art editor`
      },
}
export const DENO_POLYFILL_JS = `
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
`
export const INDEX_JS = `
import { useWorld, useGame } from "../../src/index.js";
import "./polyfill.js";

// useGame().worlds.use(MainScene());
`

export const TSCONFIG = `
{
      // Change this to match your project
      "include": [
            "src/**/*",
      ],
      "compilerOptions": {
            // Tells TypeScript to read JS files, as
            // normally they are ignored as source files
            "allowJs": true,
            // Generate d.ts files
            "declaration": true,
            // This compiler run should
            // only output d.ts files
            "emitDeclarationOnly": true,
            // Types should go into this directory.
            // Removing this would place the .d.ts files
            // next to the .js files
            "outDir": "docs/",
            // go to js file when using IDE functions like
            // "Go to Definition" in VSCode
            "declarationMap": true,
            "removeComments": false,
            "checkJs": true,
            "target": "es2022",
            "moduleResolution": "Node",
            "module": "none"
      }
}
`

export const BIOME = `
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noStaticOnlyClass": "off",
        "noBannedTypes": "off",
        "noForEach": "off"
      },
      "style": {
        "useImportType": "off",
        "useForOf": "off"
      },
      "suspicious": {
        "noAssignInExpressions": "off",
        "useIterableCallbackReturn": "off"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "lineWidth": 320
  },
  "javascript": {
    "formatter": {
      "arrowParentheses": "always",
      "lineWidth": 320,
      "bracketSameLine": false,
      "bracketSpacing": true,
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "semicolons": "always",
      "trailingCommas": "all"
    }
  }
}
`

export const DESIGN_FILE = `
# My awesome project
`

export const FILESYSTEM_LIB = `
//@ts-ignore
import { exists } from "jsr:@std/fs/exists";
/**
 * 
 * @param {string} file 
 * @param {string} text 
 */
export const writeFile = async (file, text) => {
      //@ts-ignore
      await Deno.writeTextFile(file, text)
}

/**
 * 
 * @param {string} file 
 * @returns {Promise<boolean>}
 */
export const fileExists = async file => await exists(file);

/**
 * 
 * @param {string} dir 
 */
export const createDir = async dir => {
      try {
            //@ts-ignore
            await Deno.mkdir(dir, { recursive: true });
      } catch {
            return;
      }
}

/**
 * 
 * @param {string} file 
 * @returns {Promise<string>}
 */
export const readFile = async file => {
      
      try {
            //@ts-ignore
            const content = await Deno.readTextFile(file);
            return content;
      } catch (e) {
            console.error(e);
      }
}

/**
 * @template {{}} T
 * @param {string} file 
 * @returns {Promise<T>}
 */
export const readJsonFile = async file => {
      
      try {
            //@ts-ignore
            const content = await Deno.readTextFile(file);
            return JSON.parse(content);
      } catch (e) {
            console.error(e);
      }
}
/**
 * @template {{}} T
 * @param {string} file
 * @param {T} obj
 */
export const writeJsonFile = async (file, obj) => {
      await writeFile(file, JSON.stringify(obj));
}
/**
 * @typedef {{
 *    mapping: {
 *          idx: number,
 *          color: import("../../src/rendering/rendering/canvas").HexColor
 *    }[],
 *    matrix: number[][]
 * }} Asset
 */
/**
 * 
 * @param {string} name 
 */
export const loadSpriteAsset = async name => {
      //@ts-ignore
      const uri = import.meta.resolve('assets/'+name+'.json')
      /**
       * @type {Asset}
       */
      const asset = await readJsonFile(uri);

      asset.mapping.forEach(mapping => {
            Image.map.clear();
            //@ts-expect-error
            Image.map.set(mapping.idx, mapping.color);
      });

      return asset.matrix;
}
`