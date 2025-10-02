import { GApp, html, $signal, $effect, $error, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import Tree from "./tree.js";
import { TaskManager,} from "../../ecs/TaskManager.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/
/**@import {Entity} from "../../ecs/Entity" */

export default function TaskWatcher() {
      /**@type {Signal<(() => void)[]>} */
      const hptasks = $signal(TaskManager.get().highPriorityTask);
      /**@type {Signal<(() => void)[]>} */
      const lptasks = $signal(TaskManager.get().lowPriorityTask);

      TaskManager.get().events.on('change', () => {
            hptasks.value = TaskManager.get().highPriorityTask;
            lptasks.value = TaskManager.get().lowPriorityTask;
      })
      return html`
            ${hptasks.map(() => Tree({ 
                        content: { 
                              name: 'high priority tasks [animation]', 
                              children:  hptasks.value.map(e => ({ 
                                    name: e.name || '<Anonymous>', 
                                    children: [], 
                                    tooltip: e.toString(),
                              }))
                        },
                  })
            )}
            ${lptasks.map(() => Tree({ 
                        content: { 
                              name: 'low priority tasks', 
                              children:  lptasks.value.map(e => ({ 
                                    name: e.name || '<Anonymous>', 
                                    children: [], 
                                    tooltip: e.toString(),
                              }))
                        },
                  })
            )}
      `  
}