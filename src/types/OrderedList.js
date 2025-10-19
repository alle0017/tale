/**@import {ListNode} from "./List" */

/**
 * @template T
 */
export default class OrderedList {
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
            if (!this.#head) {
                  this.#head = node;
                  return;
            }
            let curr = this.#head;

            while (curr.next) {
                  curr = curr.next;
            }

            curr.next = node;
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
            let prev = this.#head;
            let head = this.#head;
            
            if (head && value == head.value) {
                  this.#head = head.next;
                  return true;
            }
            while (head) {
                  if (head.value === value) {
                        prev.next = head.next.next;
                        return true;
                  }
                  prev = head;
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