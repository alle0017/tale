import { $effect, html } from "@alle0017!/photonjs";
import { visible, children, append } from "../../stores/drawer";
import Drawer from "../ui/drawer";
export function DrawerController() {
      return html`${
            $effect(() => visible.value?
                  Drawer({ children: children.value, }):
                  [],
            visible, children)
      }`
}