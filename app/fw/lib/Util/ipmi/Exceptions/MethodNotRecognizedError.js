export default class MethodNotRecognizedError extends Error {
      /**
       * @param {string} method 
       */
      constructor( method ){
            super(`[IPMI]: method <${method}> not recognized`);
      }
}