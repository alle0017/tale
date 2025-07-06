import * as monaco from 'monaco-editor'
import { $ref, $signal, $watcher, createContext, html } from '../../fw/index.js';
import './config.js';
// @ts-ignore
import theme from "./theme.json" assert {type: 'json'};

export const useEditor = createContext({
      text: $signal(''),
});

export default function Editor() {
      const ref = $ref();

      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ESNext,
            allowNonTsExtensions: true,
            checkJs: true,
            allowJs: true,
      })

      monaco.editor.defineTheme('nord', theme);

      ref.onLoad(el => {
            const ctx = useEditor();
            const editor = monaco.editor.create(el, {
                  value: 'export default function main(entity) {\n\t\n}',
                  language: 'javascript',
                  theme: 'nord',
                  automaticLayout: true,
            });
            editor.setValue(ctx.text.value);
            $watcher(() => editor.setValue(ctx.text.value), ctx.text);
      });

	const typings = `
	type Entity = {
		x: number,
		y: number,
		image: string,
	}
	declare function main(entity: Entity): void;
	`

	monaco.languages.typescript.javascriptDefaults.addExtraLib(
		typings,
	)

      return html`
            <div ref=${ref} style="width: 500px; height: 440px;"></div>
      `;
}