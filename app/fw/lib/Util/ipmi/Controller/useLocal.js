import BatchProxyHandler from "./ProxyHandler/BatchProxyHandler.js";


/**
 * @template {{}} T
 * @param {T} proxy
 * @param {Worker} thread
 * @returns {T}
 */
export const useLocalOnWorker = ( proxy, thread ) => {
      return new Proxy( proxy , BatchProxyHandler.fromThread( thread ) );
}
/**
 * if an object with property T.thread is passed, the thread field will contain
 * the current worker where everything is being executed.
 * create local endpoint that can call methods to a remote end point.
 * remote end point is the one loaded using the file path.
 * @template {{}} T
 * @param {string} path
 * @param {T} proxy
 * @returns {T}
 */
const useLocal = ( path, proxy ) => {
      const thread = new Worker( path, {
            type: 'module'
      });

      return useLocalOnWorker( proxy, thread );
}
export default useLocal;