import { html, $signal, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import Tree from "./tree.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/
import Image from "../../rendering/shader/lib/buffer/Image.js";

export default function ImageWatcher() {
      /**@type {Signal<Map<string, HTMLImageElement>>} */
      const images = $signal(Image.getAllLoaded());
      /**@type {Signal<Map<string, HTMLImageElement>>} */
      const aborted = $signal(Image.getAllAborted());


      Image.events.on('load', () => {
            images.set(Image.getAllLoaded());
      });
      Image.events.on('abort', () => {
            aborted.set(Image.getAllAborted());
      });
      return html`
            ${images.map(() => Tree({ 
                        content: { 
                              name: 'loaded images', 
                              children:  [...images.value.entries()].map(([k,v]) => ({ 
                                    name: k, 
                                    children: [], 
                                    tooltip: v.src,
                              }))
                        },
                  })
            )}
            ${aborted.map(() => Tree({ 
                        content: { 
                              name: 'aborted images', 
                              children:  [...aborted.value.entries()].map(([k,v]) => ({ 
                                    name: `⚠️ ${k}`, 
                                    children: [], 
                                    tooltip: v.src,
                              }))
                        },
                  })
            )}
      `  
}