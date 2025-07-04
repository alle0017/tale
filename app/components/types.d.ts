export type Tab = {
      create(): string,
      clean(layout: HTMLElement): void,
      open(layout: HTMLElement, name: string): void,
}