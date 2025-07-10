export function useSystem<K extends string, U extends {}, Q extends Query<K, U>[]>(update: (entity: Entity<Union<Q>>) => void, ...query: Q): void;
export type Union<Q extends unknown[]> = Q extends [infer X, ...infer Y] ? (X extends Query<infer R, infer N> ? Record<R, N> : {}) & Union<Y> : {};
import { Query } from "./Component";
import { Entity } from "./Entity";
//# sourceMappingURL=System.d.ts.map