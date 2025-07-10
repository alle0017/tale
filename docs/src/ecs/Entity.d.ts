export function createEntity<K extends {}>(): Entity<K>;
export type Entity<T extends {}> = {
    add: <V extends string, X extends {}>(component: Component<V, X>) => Entity<T & { [K in V]: X; }>;
} & T;
import { Component } from "./Component";
//# sourceMappingURL=Entity.d.ts.map