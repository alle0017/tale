export default class MessageValidationError extends Error {
      constructor( isLocal = false ){
            super(`[IPMI]: error while validating call to remote origin (${ isLocal ? 'on main thread': 'on different worker'})`);
      }
}