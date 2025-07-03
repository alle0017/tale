/**
 * class that implements command queue.\
 * the model of execution is the following:
 * - when the rendering process signals that it has finished,
 *    command queue can be sent 
 * - if and only if the size of the queue has a value of **n** equivalent elements in it, the
 *    queue is sent to the renderer. 
 * - **n** is computed as follow:\
 *    . at start, each command has a default load-value\
 *    . during every command execution, 
 *      register how much does rendering takes to 
 *      render
 *    . each command has a load-value that identifies how 
 *      much overhead introduces into the queue, so that the 
 *      computation is much or less equal\
 *    . with the timestamp, re-compute the command load-value, 
 *      using proportional distribution
 * ### example
 * if there are 3 commands in the queue
 * 
| command | load-value |
|---------|------------|
| create  | 1          |
| draw    | 3          |
| create  | 1          |
 * 
 * and the time of execution of this specific queue takes 10ms, 
 * the computation is done as follow:
 * 
 * load-value(create) = 2/5\*10 = 4\
 * load-value(draw) = 3/5\*10 = 6
 * @template T
 */
export default class BatchQueueController {
      /**
       * @readonly
       */
      static #EXPECTED_EXECUTION_TIME_MS = 10;

      /**
       * @type {T[]}
       */
      #queue = [];
      #busy = false;

      /**
       * expect ~ 10ms per function call, so a good queue could be around 300ms
       */
      #maxLoadValue = 30;

      /**
       * @type {Map<number,number>}
       */
      #startTimestamps = new Map();
      /**
       * @type {number}
       */
      #avgTimestamp = 0;

      #executions = 0;

      /**
       * return true if the method must 
       * be used to invoke the THIS.clearQueue method
       * @param {number} queueId 
       */
      onExecutionComplete( queueId ){
            const dt = Date.now() - this.#startTimestamps.get( queueId );

            // clear the resolved queue, to ensure that the 
            // busy state of the worker is tracked correctly
            this.#startTimestamps.delete( queueId );

            this.#executions++;

            // round the random fluctuations 
            // caused by worker overloads and gpu performances
            this.#avgTimestamp = (this.#avgTimestamp*(this.#executions - 1) + dt)/this.#executions;

            // scale load-value based on performance
            this.#maxLoadValue = Math.max(
                  10,
                  Math.round( 
                        this.#maxLoadValue * BatchQueueController.#EXPECTED_EXECUTION_TIME_MS/this.#avgTimestamp 
                  )
            );

            // check if all the previous queue where resolved
            if( this.#startTimestamps.size <= 0 )
                  this.#busy = false;

            return this;
      }

      /**
       * return true if the method must 
       * be used to invoke the THIS.clearQueue method
       * @param {T} payload
       */
      addMethodToQueue( payload ){

            this.#queue.push( payload );

            return this;
      }

      canFlush(){
            // if the worker is free and at least one message 
            // is in the queue or if the queue exceed the estimated
            // max load value
            return ( !this.#busy && this.#queue.length > 0 ) || this.#queue.length >= this.#maxLoadValue;
      }

      /**
       * @param {number} queueId 
       * @returns 
       */
      flushQueue( queueId ){

            const queue = this.#queue;
            // flush the queue
            this.#queue = [];

            // track the start instant to then
            // calculate the new load-value
            this.#startTimestamps.set( queueId, Date.now() );

            this.#busy = true;

            return queue;
      }
}