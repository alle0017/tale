export default createEntity;
export type Entity<T extends {}> = {
    add<K extends {}>(component: K): Entity<T & K>;
    has(key: string): boolean;
} & T;
/**
 * @template {{}} T
 * @typedef {{
 *    add<K extends {}>(component: K): Entity<T & K>,
 *    has(key: string): boolean,
 * } & T} Entity
 */
/**
 * @template {{}} K
 * @return {Entity<K>}
 */
declare function createEntity<K extends {}>(): Entity<K>;
//# sourceMappingURL=Entity.d.ts.map