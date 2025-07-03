import IPMIEvent from "./IPMIEvent.js";

export default class IPMIRequestEvent extends IPMIEvent {
      /**
       * @param {unknown} e 
       * @returns {e is IPMIRequestEvent}
       */
      static validateMessage(e){
            return e 
            && typeof e == "object" &&
            "method" in e && 
            typeof e.method == "string" &&
            "args" in e;
      }

      /**
       * @type {string}
       */
      method;
      /**
       * @type {unknown[]}
       */
      args;

      /** 
       * @param {number} callId 
       * @param {string} method
       * @param {unknown[]} args
       */
      constructor( callId, method, args ){
            super( callId )
            this.method = method;
            this.args = args;
      }
}