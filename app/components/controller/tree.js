import { $effect, html } from "@alle0017!/photonjs";
import { visible, tree,clickHandler, push } from "../../stores/tree";
import Tree from "../ui/tree";
export function TreeController() {
      setTimeout(() => {
            push({
                  name: 'aaa',
                  children: []
            })
      }, 1000)
      return html`
            <div style="position: absolute; left: 0px; top: 0px;">
                  ${
                        $effect(() => visible.value?
                              Tree({ content: tree.value, onClick: clickHandler.value }):
                              [],
                        visible, tree, clickHandler)
                  }
            </div>
      `
}