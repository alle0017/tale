import { $effect, html } from "@alle0017!/photonjs";
import { visible, items, } from "../../stores/bottom-bar";
import { BottomBar } from "../ui/bottom-bar";
export function BottomBarController() {
      return html`${
            $effect(() => visible.value?
                  BottomBar({ items: items.value, height: 100, width: 100 }):
                  [],
            visible, items)
      }`
}