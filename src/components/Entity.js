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
const createEntity = () => {
      const map = new Map();

      // @ts-ignore
      return new Proxy({
            add(component) {
                  if (!component) {
                        throw new Error("illegal component addition");
                  }

                  for (const k of Object.keys(component)) {
                        if (map.has(k)) {
                              throw new Error(`illegal component addition: property "${k}" was already bound`);
                        }

                        map.set(k,component);
                  }

                  return this;
            }
      }, {
            has(target, key) {
                  return map.has(key) || key in target;
            },
            get(target, key) {
                  if (key in target) {
                        return target[key];
                  }

                  if (!map.has(key)) {
                        throw new Error("illegal access to property");
                  }

                  return map.get(key)[key];
            }
      })
};

export default createEntity;