import IPMIEvent from "./IPMIEvent.js";
import IPMIRequestEvent from "./IPMIRequestEvent.js";
import IPMIResponseEvent from "./IPMIResponseEvent.js";

/**
 * @template {IPMIRequestEvent | IPMIResponseEvent} T
 */
export default class IPMIBatchEvent {

      /**
       * @param {unknown} e 
       * @returns {e is MessageEvent<IPMIBatchEvent<unknown>>}
       */
      static #validateMessage(e){
            if( !( e && typeof e == "object" && "data" in e && e.data && typeof e.data == "object" ) )
                  return false;

            if( !("queue" in e.data && typeof e.data.queue == "object" && e.data.queue instanceof Array) )
                  return false;

            return true;
      }

      /**
       * @param {unknown} e 
       * @returns {e is MessageEvent<IPMIBatchEvent<IPMIRequestEvent>>}
       */
      static validateRequestMessage(e){
            if( !this.#validateMessage(e) ){
                  return false;
            }

            for( let i = 0; i < e.data.queue.length; i++ ){
                  if( !IPMIRequestEvent.validateMessage( e.data.queue[i] ) )
                        return false;
            }
            return true;
      }

      /**
       * @param {unknown} e 
       * @returns {e is MessageEvent<IPMIBatchEvent<IPMIResponseEvent>>}
       */
      static validateResponseMessage(e){
            
            if( !this.#validateMessage(e) ){
                  return false;
            }

            for( let i = 0; i < e.data.queue.length; i++ ){
                  if( !IPMIResponseEvent.validateMessage( e.data.queue[i] ) )
                        return false;
            }
            return true;
      }

      /**
       * @type {T[]}
       */
      queue;

      /**
       * @type {number[]}
       */
      callIds

      /** 
       * @param {number[]} callIds 
       * @param {T[]} queue
       */
      constructor( callIds, queue ){
            this.callIds = callIds;
            this.queue = queue;
      }
}