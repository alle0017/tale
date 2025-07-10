import { Entity } from './Entity';
export function createComponent<T extends string, K extends {}, X extends unknown[]>(key: T, factory: (...params: X) => K): [Query<T, K>, (...args: X) => Component<T, K>];
export type Component<T extends string, K extends {}> = {
    $$name: T;
    state: K;
};
export type Query<K extends string, T extends {}> = (e: Entity<{}>) => e is Entity<T>;
//# sourceMappingURL=Component.d.ts.map