import EventManager from "../../../ecs/Event.js";


/**
 * @template T
 */
export default class ImmutableCanvas {
      /**
       * @type {T[][][]}
       */
      #stack = [];
      /**
       * @type {T[][]}
       */
      #state = [];

      /**
       * @type {EventManager<'statechange'>}
       */
      #events = new EventManager();

      get state() {
            return this.#state;
      }

      get events() {
            return this.#events;
      }

      #cloneState() {
            const clone = []
            for (let i = 0; i < this.#state.length; i++) {
                  clone.push([])
                  for (let j = 0; j < this.#state[i].length; j++) {
                        clone[i].push(this.#state[i][j])
                  }
            }
            return clone;
      }
      /**
       * method that uses {@link #cloneState} to 
       * clone the state and push it onto the stack.
       * the stack is kept for last 20 values
       */
      #cloneAndPush() {
            this.#stack.push(this.#cloneState());

            if (this.#stack.length > 20) {
                  this.#stack.shift();
            }
      }
      undo() {
            this.#state = this.#stack.pop();
            this.#events.trigger('statechange');
      }
      /**
       * 
       * @param {T} value 
       * @param {number} i 
       * @param {number} j 
      */
     insert(value, i, j) {
           this.#cloneAndPush();
           this.#state[i][j] = value;
           this.#events.trigger('statechange');
      }
      /**
       * 
       * @param {number} height 
       * @param {number} width 
       * @param {T} NULL 
       */
      resize(width, height, NULL) {
            this.#cloneAndPush();
            if (this.#state.length > height) {
                  this.#state.length = height;
            } else {
                  this.#state = this.#state.concat(new Array(height - this.#state.length));
            }

            for (let i = 0; i < this.#state.length; i++) {
                  if (!this.#state[i]) {
                        this.#state[i] = [];
                  }

                  if (this.#state[i].length > width) {
                        this.#state[i].length = width;
                  } else {
                        const delta = width - this.#state[i].length;

                        for (let j = 0; j < delta; j++) {
                              this.#state[i].push(NULL);
                        }
                  }
            }

            this.#events.trigger('statechange');
      }
}