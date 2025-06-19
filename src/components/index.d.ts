import type { Game } from "./Game";

export interface Component<T extends string> {
      readonly key: T;
}

export type Entity<T extends {}> = {
    add<K extends {}>(component: K): Entity<T & K>;
    has(key: string): boolean;
} & T

export declare const createEntity: <K extends {}>() => Entity<K>
export declare function createSystem<T>(system: (components: T[]) => void): {
    add(comp: T): void;
    delete(comp: T): void;
    dispose(): void;
    stop(): void;
    resume(): void;
}

export declare function createAnimationSystem<T>(system: (components: T[]) => void): {
    add(comp: T): void;
    delete(comp: T): void;
    dispose(): void;
    stop(): void;
    resume(): void;
}

export declare const useGame: () => Game;
export type {Game};