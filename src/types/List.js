/**
 * @template T
 * @typedef {{
 *    next: List<T>
 *    value: T,
 * }} List
 */

/**
 * @template T
 * @typedef {{
 *    head: List<T>,
 * }} Root
 */

/**
 * @template T
 * @param {T} value 
 * @returns {List<T>}
 */
export function node(value) {
      return {
            next: null,
            value,
      }
}

/**
 * @template T
 * @returns {Root<T>}
 */
export function create() {
      return {
            head: null,
      }
}


/**
 * @template T
 * @param {Root<T>} list 
 * @param {List<T>} node 
 */
export function append(list, node) {
      node.next = list.head;
      list.head = node;
}

/**
 * @template T
 * @param {Root<T>} list 
 * @param {List<T>} node 
 */
export function remove(list, node) {
      if (list.head === node) {
            list.head = node.next;
            return;
      }

      node.value = list.head.value;
      list.head = list.head.next;
}

/**
 * @template T
 * @param {Root<T>} list 
 * @param {(value: T) => void} callback
 */
export function forEach(list, callback) {
      let head = list.head;

      while (head) {
            callback(head.value);
            head = head.next;
      }
}

/**
 * @template T
 * @param {Root<T>} list 
 * @param {T} value
 */
export function push(list, value) {
      const n = node(value);

      append(list,n);

      return n;
}
/**
 * @template T
 * @param {Root<T>} list 
 * @param {T} value
 */
export function has(list, value) {
      let head = list.head;

      while (head) {
            if (head.value === value) {
                  return head;
            }
            head = head.next;
      }
      return null;
}

/**
 * @template T
 * @param {Root<T>} list 
 * @param {T} value
 */
export function unique(list, value) {
      let newNode = has(list, value);
      if (newNode) {
            return;
      }

      newNode = node(value);

      append(list,newNode);

      return newNode;
}