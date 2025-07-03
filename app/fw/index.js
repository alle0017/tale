import Parser from "./lib/Parser/Parser.js"
import Signal from "./lib/Signals/Signal.js";
import DOMRenderer from "./lib/Parser/View/DOMRenderer.js";
import Register from "./lib/Parser/Register.js";
import VNode from "./lib/Parser/Nodes/VNode.js";
import LinearDiffer from "./lib/Parser/Diff/LinearDiffer.js";
import Effect from "./lib/Signals/Effect.js";
import Ref from "./lib/Signals/Reference.js";
import css from "./lib/css/CssParser.js";
import VNodeBuilder from "./lib/Parser/Nodes/VNodeBuilder.js";
import Out from "./lib/Util/Logger.js";
import Exception from "./lib/Signals/Exception.js";

export {css,Signal,VNode};

/**
 * 
 * @param {TemplateStringsArray} strings 
 * @param  {...unknown} args 
 * @returns {VNode<HTMLElement>[]}
 */
export const html = ( strings, ...args ) => {
      const tree = new Parser(GApp.builder).parse( strings, ...args );
      Exception.notify();
      return tree;
}
 
export const $error = Exception;

/**
 * @template T
 * @param {T} value 
 * @returns {Signal<T>}
 */
export const $signal = value => new Signal(value);
/**
 * @template T
 * @param {(() => T )| ((oldValue: T) => T)} callback 
 * @param  {...Signal<unknown>} signals 
 */
export const $effect = (callback,...signals) => new Effect(callback,...signals);
/**
 * connect the callback to the specified signal, producing a non-computed side effect.
 * the returned value is the unsubscribe function, that can be used to detach the listener
 * from the subscription list. 
 * * @example 
 * ```js
 * const signal = $signal(0);
 * const unsubscribe = $watcher(() => console.log(signal.value), signal)
 * 
 * signal.value += 2; // log: 2
 * signal.value += 2; // log: 4
 * unsubscribe();
 * signal.value += 2; // log: nothing
 * ```
 * @param {()=>void} callback 
 * @param {Signal<unknown>} signal 
 */
export const $watcher = ( callback, signal ) => signal.subscribe(callback);

/**
 * @template {HTMLElement} T
 * @returns {Ref<T>}
 */
export const $ref = () => new Ref();

/**
 * create a context that can be retrieved by calling 
 * the function returned by the createContext hook.
 * @example
 * ```javascript
 * const useTheme = createContext({ theme: 'dark' });
 * // ... later in the code
 * 
 * const theme = useTheme();
 * if( theme.theme == 'dark' ){
 *     console.log('is dark!!!');
 * }
 * ```
 * @template {{}} T
 * @param {T} ctx
 */
export const createContext = ctx => {
      return () => {
            return ctx;
      }
}

export const GApp = {
      /**
       * @type {VNodeBuilder<HTMLElement>}
       */
      builder: new VNodeBuilder( new DOMRenderer(), new Register(), LinearDiffer ),

      /**
       * method used to register a custom component
       * @param {(args: {}) => VNode<HTMLElement>[]} renderer 
       * @param {string} tag 
       * @returns {typeof GApp}
       */
      registerComponent(renderer,tag = renderer.name){
            this.builder.register(renderer,tag)
            return this;
      },


      /**
       * method used to register a custom component
       * @param {() => VNode<HTMLElement>[]} component
       * @param {HTMLElement} [root=document.body] 
       * @returns {typeof GApp}
       */
      createRoot(component, root = document.body){
            
            try {
                  const tree = component();
                  tree.forEach(node => root.append(node.render()));
            } catch (e) {
                  $error.throw(e);
            }

            return this;
      },

      /**
       * function that can be used to use a plugin. A plugin is 
       * some code that is initialized in the pluginStarter and modifies
       * the behavior of how the framework itself works
       * @param {(app: typeof GApp) => void} pluginStarter 
       */
      use( pluginStarter ){
            pluginStarter( this );
            return this;
      },

      /**
       * 
       * @param {boolean} flag 
       * @returns {typeof GApp}
       */
      setDebug( flag ){
            Out.debug = flag;
            return this;
      }
}
