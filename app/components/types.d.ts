import type GameObjectModel from "./GameObjectModel";
import type GameObjectView from "./GameObjectView";
import type {Pane} from "tweakpane";

export type Tab = {
      items: readonly string[],
      icon: Readonly<string>,
      use(name: string, pane: Pane): void,
      create(pane: Pane): void | Promise<void>,
      delete(): void,
      clean(): void,
}