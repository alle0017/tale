import type GameObjectModel from "./GameObjectModel";
import type GameObjectView from "./GameObjectView";

export type Tab<T extends GameObjectView<GameObjectModel>> = {
      current: T,
      items: readonly string[],
      icon: Readonly<string>,
      use(name: string): void,
      create(): void,
      delete(): void,
      clean(): void,
}