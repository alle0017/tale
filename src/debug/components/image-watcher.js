import { html, $signal, } from "../../../node_modules/@alle0017!/photonjs/index.js"
import Tree from "./tree.js";
/**@import {Signal, VNode} from  "../../../node_modules/@alle0017!/photonjs/index.js"*/
import Image from "../../rendering/shader/lib/buffer/Image.js";

export default function ImageWatcher() {
      /**@type {Signal<string[]>} */
      const images = $signal(Image.getAllLoaded());



      Image.events.on('load', () => {
            images.set(Image.getAllLoaded());
      })
      return html`
            ${images.map(() => Tree({ 
                        content: { 
                              name: 'loaded images', 
                              children:  images.value.map(e => ({ 
                                    name: e, 
                                    children: [], 
                                    tooltip: e,
                              }))
                        },
                  })
            )}
      `  
}