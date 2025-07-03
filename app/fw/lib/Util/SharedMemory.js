/**
 * @typedef {(mem: number[]) => void} Reader
 */
/**
 * @constant
 * @enum {number}
 */
const SharedAction = {
      None: 0,
      Read: 1,
      Write: 2,
      Dirty: 3,
}

export class SharedReader {
      /**
       * @type {Map<Int32Array<SharedArrayBuffer>, Set<Reader>>}
       */
      static #mems = new Map();
      /**
       * @type {Set<()=>void>}
       */
      static #runners= new Set();
      static #isRunning = false;
      static #id = -1;
      static #poller() {

            let dirty = false;

            for ( const [k,v] of SharedReader.#mems ) {
                  if ( Atomics.compareExchange(k,0,SharedAction.Dirty,SharedAction.Read) == SharedAction.Dirty ) {
                        const cpy = [];

                        k.subarray(1).forEach( v => cpy.push(v) );

                        v.forEach( sub => sub(cpy) );

                        Atomics.store(k,0,SharedAction.None);
                        dirty = true;
                  }
            }

            if ( dirty ) {
                  SharedReader.#runners.forEach( f => f() );
            }

            SharedReader.#id = requestAnimationFrame(SharedReader.#poller); 
      }

      /**
       * call the callback each time a change is detected.
       * note that calls doesn't happens immediately after
       * the change happened, but at the end of control that every 
       * piece of shared memory as changed.
       * @example
       * - memory A changes in main thread
       * - memory B changes in main thread
       * 
       * - memory A changes is detected in slave thread
       * - memory B changes is detected in slave thread
       * - HERE is called the callback, after all detections happened
       * @param {() => void} sub 
       */
      static onRead( sub ) {
            this.#runners.add(sub)
      }

      /**
       * @type {Int32Array<SharedArrayBuffer>}
       */
      #buffer;

      /**
       * 
       * @param {SharedArrayBuffer} buffer 
       */
      constructor( buffer ) {
            this.#buffer = new Int32Array(buffer);
      }

      /**
       * watch the shared memory to change.
       * when the memory changes, updates are passed 
       * to the Reader callback as an array of numbers.
       * to prevent memory leak, if the watcher is deleted, 
       * please unsubscribe from it.
       * @param {Reader} sub 
       */
      subscribe( sub ) {
            if ( !SharedReader.#mems.has(this.#buffer) ) {
                  SharedReader.#mems.set(this.#buffer,new Set([sub])); 

                  if ( !SharedReader.#isRunning ) {
                        SharedReader.#poller();
                  }
            } else {
                  SharedReader.#mems.get(this.#buffer).add(sub);
            }
      }

      /**
       * unsubscribe a previously
       * registered method from the list of watchers. 
       * @param {Reader} sub 
       */
      unsubscribe( sub ) {
            if ( !SharedReader.#mems.has(this.#buffer) ) 
                  return;
            const set = SharedReader.#mems.get(this.#buffer);

            set.delete(sub);

            if ( set.size <= 0 ) {
                  SharedReader.#mems.delete(this.#buffer);
            }
      }
}

export class SharedWriter {
      /**
       * @type {Map<Int32Array<SharedArrayBuffer>,number[]>}
       */
      static #writes = new Map();

      static #isRunning = false;
      static #id = -1;
      static #pusher() {

            for ( const [k,v] of SharedWriter.#writes ) {
                  if ( Atomics.compareExchange(k,0,SharedAction.None,SharedAction.Write) == SharedAction.None ) {
                        k.set(v,1);
                        Atomics.store(k,0,SharedAction.Dirty);
                  }
            }

            SharedWriter.#id = requestAnimationFrame(SharedWriter.#pusher); 

      }

      /**
       * @type {Int32Array<SharedArrayBuffer>}
       */
      #buffer;

      /**
       * @readonly
       * @type {number}
       */
      #length;

      get buffer() {
            return this.#buffer.buffer;
      }

      /**
       * 
       * @param {number} length
       */
      constructor( length ) {
            this.#length = length;
            this.#buffer = new Int32Array(new SharedArrayBuffer((length + 1)*Int32Array.BYTES_PER_ELEMENT));
            //SharedWriter.#writes.set(this.#buffer,[]);
      }

      /**
       * write values into array. this operation is batched, so 
       * don't rely on it to see changes immediately.
       * values are stored in a pre-view, that is then 
       * saved in shared memory when no one is reading.
       * @param {number[]} values 
       * @param {number} offset 
       */
      write(values,offset = 0) {
            if ( !SharedWriter.#isRunning ) {
                  SharedWriter.#pusher();
            }

            let view = SharedWriter.#writes.get(this.#buffer);

            if ( !view ) {
                  view = [];

                  for ( let i = 0; i < this.#length; i++ ) {
                        view.push(0);
                  }

                  SharedWriter.#writes.set(this.#buffer,view);
            }

            view.splice(offset,values.length,...values);
      }

      /**
       * read the value at the specified index of memory.
       * @param {number} index 
       * @returns {number}
       */
      read( index ) {
            let view = SharedWriter.#writes.get(this.#buffer);

            if ( !view ) {
                  // no updates until now
                  return 0;
            }

            return view.at(index);
      }
}