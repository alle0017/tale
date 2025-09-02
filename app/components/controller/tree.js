import { $effect, html } from "@alle0017!/photonjs";
import { visible, tree,onClick, push } from "../../stores/tree";
import Tree from "../ui/tree";
export function TreeController() {
      return html`
            <div style="position: absolute; left: 0px; top: 0px; border-right: var(--border0);">
                  ${
                        $effect(() => visible.value?
                              Tree({ content: tree.value, onClick: onClick.value }):
                              [],
                        visible, tree, onClick)
                  }
            </div>
      `
}