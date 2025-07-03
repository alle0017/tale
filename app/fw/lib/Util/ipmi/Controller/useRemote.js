import MessageValidationError from "../Exceptions/MessageValidationError.js";
import MethodNotRecognizedError from "../Exceptions/MethodNotRecognizedError.js";
import IPMIResponseEvent from "../Event/IPMIResponseEvent.js";
import IPMIBatchEvent from "../Event/IPMIBatchEvent.js";
/**
 * @param {Object} source 
 * @param {string} method
 * @returns 
 */
const existMethod = ( source, method ) => {
      const keys = Object.getOwnPropertyNames(
            Object.getPrototypeOf( source )
      );

      for( let i = 0; i < keys.length; i++ ){
            if( (typeof keys[i] == "string" && keys[i] == method) || (typeof keys[i] == "symbol" && keys[i].toString() == method) )
                  return true;
      }

      return false;
}

/**
 * create remote end point, that can receive calls from the local end point.
 * remote end point can be thought as single point of access fro your worker
 * API. It can be considered as a controller, or a simple proxy router, that redirect
 * your function calls to other objects more specialized.
 * @template {{}} T
 * @param {{ new(): T }} origin 
 */
const useRemote = origin => {

      if( typeof self === 'undefined' || self.document ){
          return;  
      }

      const source = new origin();

      addEventListener("message", async e => {
            if( !IPMIBatchEvent.validateRequestMessage(e) ){
                  throw new MessageValidationError();     
            }

            /**
             * @type {IPMIResponseEvent[]}
             */
            const res = [];


            for( let i = 0; i < e.data.queue.length; i++ ){
                  const req = e.data.queue[i];

                  if( !existMethod( source, req.method ) ){
                        throw new MethodNotRecognizedError( req.method );
                  }
      
                  try{
                        let ret = source[req.method]( ...req.args );
      
                        if( ret instanceof Promise ){
                              ret = await ret;
                        }
                        res.push( new IPMIResponseEvent( req.callId, ret, null, null ) );
      
                  }catch(error){
                        res.push( new IPMIResponseEvent( 
                                    req.callId, null, 
                                    (/**@type {Error}*/(error)).message || "[IPMI] error while executing",
                                    (/**@type {Error}*/(error)).stack || "stack not reachable"
                              ) 
                        );
                  }
            }

            self.postMessage( new IPMIBatchEvent( e.data.callIds, res ) );
      });
}

export default useRemote;