/**
 * @template T
 * @typedef {{
 *    next: ListNode<T>
 *    value: T,
 * }} ListNode
 */

/**
 * @template T
 */
export default class List {
      /**
       * @type {ListNode<T>}
       */
      #head;

      /**
       * @template T
       * @param {T} value 
       * @returns {ListNode<T>}
       */
      #node(value) {
            return {
                  next: null,
                  value,
            }
      }
      get length() {
            let len = 0;
            let curr = this.#head;

            while (curr.next) {
                  curr = curr.next;
                  len++;
            }

            return len;
      }


      /**
       * @param {ListNode<T>} node 
       */
      append(node) {
            node.next = this.#head;
            this.#head = node;
      }

      /**
       * @param {ListNode<T>} node 
       */
      remove(node) {
            if (this.#head === node) {
                  this.#head = node.next;
                  return;
            }

            node.value = this.#head.value;
            this.#head = this.#head.next;
      }

      /**
       * @param {(value: T) => void} callback
       */
      forEach(callback) {
            let head = this.#head;

            while (head) {
                  callback(head.value);
                  head = head.next;
            }
      }
      /**
       * @param {T} value 
       */
      has(value) {
            let head = this.#head;

            while (head) {
                  if (head.value === value) {
                        return true;
                  }
                  head = head.next;
            }
            return false;
      }
      /**
       * 
       * @param {ListNode<T>} node 
       */
      holds(node) {
            let head = this.#head;

            while (head) {
                  if (head == node) {
                        return true;
                  }
                  head = head.next;
            }
            return false;
      }
      /**
       * @param {T} value
       */
      push(value) {
            const n = this.#node(value);

            this.append(n);

            return n;
      }
      /**
       * @param {T} value 
       */
      delete(value) {
            let head = this.#head;

            while (head) {
                  if (head.value === value) {
                        this.remove(head);
                        return true;
                  }
                  head = head.next;
            }
            return false;
      }
      clear() {
            this.#head = null;
      }
      * [Symbol.iterator]() {
            let head = this.#head;

            while (head) {
                  yield head.value;
                  head = head.next;
            }
      }
}