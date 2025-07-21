import * as monaco from 'monaco-editor'
import { $ref, $signal, $watcher, createContext, html } from '../../fw/index.js';
import './config.js';
// @ts-ignore
import theme from "./theme.json" assert {type: 'json'};
// @ts-ignore
import tsconfig from "../../../docs/glob.d.ts?raw"


export const useEditor = createContext({
      text: $signal(''),
});

export default function Editor() {
      const ref = $ref();

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ESNext,
            allowNonTsExtensions: true,
            checkJs: true,
            allowJs: true,
      });


      monaco.editor.defineTheme('nord', theme);

	monaco.languages.typescript.javascriptDefaults.addExtraLib(tsconfig.replaceAll('export', ''))

      ref.onLoad(el => {
            const ctx = useEditor();
            const editor = monaco.editor.create(el, {
                  value: 'export default function main(entity) {\n\t\n}',
                  language: 'javascript',
                  theme: 'nord',
                  automaticLayout: true,
                  minimap: {
                        renderCharacters: false,
                        scale: 2,
                  }
            });
            editor.setValue(ctx.text.value);
            $watcher(() => editor.setValue(ctx.text.value), ctx.text);
      });

      return html`
            <div ref=${ref} style="width: 500px; height: 440px;"></div>
      `;
}