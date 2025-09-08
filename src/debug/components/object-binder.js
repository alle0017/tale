import { html, $signal } from "../../../node_modules/@alle0017!/photonjs/index.js";
import { Input } from "./input/input.js";
import { TYPES } from "./input/type.js";
/**@import {Ref,VNode} from "../../../node_modules/@alle0017!/photonjs/index.js";*/
/**@typedef {() => void} Command */
class CommandScheduler {
      /**
       * @type {Set<Command>}
       */
      static #commands = new Set();
      static #run() {
            const callback = () => {
                  CommandScheduler.#commands.forEach(cmd => {
                        try {
                              cmd();
                        } catch {
                              CommandScheduler.#commands.delete(cmd);
                        }
                  });
                  if (CommandScheduler.#commands.size > 0) {
                        requestIdleCallback(callback)
                  }
            }
            callback();
      }
      /**
       * @param {Command} cmd 
       */
      static useCommand(cmd) {
            CommandScheduler.#commands.add(cmd);

            if (CommandScheduler.#commands.size === 1) {
                  CommandScheduler.#run();
            }
      }
}
/**
 * 
 * @param {{
 *    label: string,
 *    source: {},
 *    __path?: string[]
 * }} param0 
 */
export default function ObjectBinder({ label, source, __path }) {
      __path ||= [];
      const fields = $signal([]);
      CommandScheduler.useCommand(() => {
            fields.set(
                  Object
                  .entries(source)
                  .map(([k,v]) => {
                        if (typeof v === 'object') {
                              return ObjectBinder({ label: k, source: v, __path: [...__path, k] })
                        }
                        if (TYPES[typeof v]) {
                              return Input({ label: k, type: typeof v, value: v });
                        }
                        if (typeof v === 'function') {
                              return Input({ label: k, type: 'string', value: 'f(x)', disabled: true, style: 'font-family: cursive;' });
                        }
                        return Input({ label: k, type: 'string', value: v });
                  })
                  .flat(3)
            )
      });
      return html`
            <Collapsable label=${label} style="flex-direction: column; gap: 5px;" indent=${5}>
                  ${fields}
            </Collapsable>
      `
}     