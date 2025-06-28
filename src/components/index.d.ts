import type { TaskManager } from "./TaskManager";

export interface Component<T extends string> {
      readonly key: T;
}

export type Entity<T extends {}> = {
    add<K extends {}>(component: K): Entity<T & K>;
    has(key: string): boolean;
} & T

export declare const createEntity: <K extends {}>() => Entity<K>

export type System<T> = {
    add(comp: T): void;
    delete(comp: T): void;
    dispose(): void;
    stop(): void;
    resume(): void;
};

export declare function createSystem<T>(system: (components: T[], isDirty: boolean) => void): System<T>
export declare function createAnimationSystem<T>(system: (components: T[], isDirty: boolean) => void): System<T>

export declare const useTaskManager: () => TaskManager;
export type {TaskManager};