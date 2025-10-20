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