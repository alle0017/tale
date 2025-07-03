import IPMIRequestEvent from "../../Event/IPMIRequestEvent.js";
import IPMIResponseEvent from "../../Event/IPMIResponseEvent.js";
import BatchQueueController from "../BatchController/BatchQueueController.js";
import MessageValidationError from "../../Exceptions/MessageValidationError.js";
import IPMIBatchEvent from "../../Event/IPMIBatchEvent.js";

/**
 * 
 * @param {unknown} o
 * @returns {o is Transferable} 
 */
const isTransferable = o => {
      return o instanceof ArrayBuffer ||
      (typeof MessagePort !== "undefined" && o instanceof MessagePort) ||
      (typeof ImageBitmap !== "undefined" && o instanceof ImageBitmap) ||
      (typeof OffscreenCanvas !== "undefined" && o instanceof OffscreenCanvas) ||
      (typeof AudioData !== "undefined" && o instanceof AudioData) ||
      (typeof VideoFrame !== "undefined" && o instanceof VideoFrame) ||
      (typeof ReadableStream !== "undefined" && o instanceof ReadableStream) ||
      (typeof WritableStream !== "undefined" && o instanceof WritableStream) ||
      (typeof TransformStream !== "undefined" && o instanceof TransformStream);
}
/**
 * @template {{}} T
 * @implements {ProxyHandler<T>}
 */
export default class BatchProxyHandler {

      /**
       * @type {Map<Worker,BatchProxyHandler>}
       */
      static #register = new Map();

      /**
       * factory method for creation of
       * Batch handlers. if the worker has an already registered
       * handler, the returned value is the existing one. in this way,
       * different local executors can share the same handler to the same 
       * remote end point
       * @param {Worker} thread 
       * @return {BatchProxyHandler}
       */
      static fromThread( thread ) {
            if ( this.#register.has(thread) ) {
                  return this.#register.get(thread);
            }

            const handler = new BatchProxyHandler(thread);
            this.#register.set(thread,handler);
            return handler;
      }


      /**
       * keep track of all methods
       * @type {Map<string | symbol,( ...args: unknown[] ) => Promise<unknown>>}
       */
      #methods = new Map();

      /**
       * @readonly
       * @type {Worker}
       */
      #thread;

      /**
       * @type {Transferable[]}
       */
      #transferable = [];

      /**
       * @readonly
       * @type {BatchQueueController<IPMIRequestEvent>}
       */
      #queue;

      /**
       * associate method to its promise
       */
      #methodCallId = 0;

      /**
       * identify queue sended to the worker. 
       * used to adjust the overload
       */
      #queueId = 0;

      /**
       * @type {Map<number,( a: unknown ) => void>}
       */
      #resolvers = new Map();
      
      /**
       * @type {Map<number,( a: unknown ) => void>}
       */
      #rejectors = new Map();

      /**
       * @param {Worker} thread 
       * @private
       */
      constructor( thread ){
            this.#queue = new BatchQueueController();
            this.#thread = thread;

            this.#thread.addEventListener('message', e => {
                  if( !IPMIBatchEvent.validateResponseMessage(e) ){
                        throw new MessageValidationError( true );
                  }

                  for( let i = 0; i < e.data.queue.length; i++ ){
                        this.#resolveSuspendedMethod( e.data.queue[i] );
                  }

                  for( let i = 0; i < e.data.callIds.length; i++ )
                        this.#queue.onExecutionComplete( e.data.callIds[i] );

                  if( this.#queue.canFlush() ){
                        this.#send();
                  }

            });
            
      }

      /**
       * resolve method sended to the worker. this is done by resolving
       * the promise previously saved. Can throw if, 
       * inside the worker, an error was catch
       * @param {IPMIResponseEvent} e 
       * @returns 
       */
      #resolveSuspendedMethod(e){
            const resolve = this.#resolvers.get( e.callId );
            const reject = this.#rejectors.get( e.callId );

            this.#resolvers.delete( e.callId );
            this.#rejectors.delete( e.callId );

            if( e.exceptionMessage ){
                  const error = new Error( e.exceptionMessage );

                  error.stack = e.exceptionStack;

                  reject( error );

                  return;
            }

            resolve( e.returnValue );
      }

      /**
       * send the current queue to the worker
       */
      #send(){
            const transferable = this.#transferable;
            const id = this.#queueId;

            this.#queueId++;

            this.#transferable = [];

            this.#thread.postMessage(
                  new IPMIBatchEvent(
                        [id],
                        this.#queue.flushQueue( id )
                  ),
                  transferable
            );
      }

      /**
       * @param {T} target 
       * @param {symbol|string} prop 
       */
      get( target, prop ){
            if( prop == "thread" )
                  return this.#thread;

            if (typeof target[prop] !== 'function')
                  return target[prop]

            if( !this.#methods.has( prop ) ){
                  this.#methods.set( prop, ( ...args ) => {
                        return new Promise((resolve,reject) => {

                              const id = this.#methodCallId++;

                              if( args ){
                                    for( let i = 0; i < args.length; i++ ){
                                          const arg = args[i];

                                          if( isTransferable( arg ) )
                                                this.#transferable.push( arg );
                                    }
                              }     

                              this.#queue.addMethodToQueue(
                                    new IPMIRequestEvent( 
                                          id, 
                                          prop.toString(), 
                                          args 
                                    ),
                              );

                              this.#resolvers.set( id, resolve );
                              this.#rejectors.set( id, reject );

                              if( !this.#queue.canFlush() ){
                                    return;
                              }

                              this.#send();
                        });
                  })
            } 

            return this.#methods.get( prop );

      }
}