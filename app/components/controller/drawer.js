import { $effect, html } from "@alle0017!/photonjs";
import { visible, children, append } from "../../stores/drawer";
import Drawer from "../ui/drawer";
export function DrawerController() {
      setTimeout(() => {
                  append(html`<h1>hello world</h1>`)
            }, 1000)
      return html`${
            $effect(() => visible.value?
                  Drawer({ children: children.value, }):
                  [],
            visible, children)
      }`
}