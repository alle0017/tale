import IPMIEvent from "./IPMIEvent.js";

export default class IPMIResponseEvent extends IPMIEvent {
      /**
       * @param {unknown} e 
       * @returns {e is IPMIResponseEvent}
       */
      static validateMessage(e){
            return e 
            && typeof e == "object" &&
            "returnValue" in e && 
            "exceptionMessage" in e &&
            "exceptionStack" in e;
      }

      /**
       * @type {unknown}
       */
      returnValue;

      /**
       * @type {string}
       */
      exceptionMessage;

      /**
       * @type {string}
       */
      exceptionStack;

      /** 
       * @param {number} callId 
       * @param {unknown} returnValue 
       * @param {string} exceptionMessage 
       * @param {string} exceptionStack 
       */
      constructor( callId, returnValue, exceptionMessage, exceptionStack ){
            super( callId )
            this.returnValue = returnValue;
            this.exceptionMessage = exceptionMessage;
            this.exceptionStack = exceptionStack;
      }
}