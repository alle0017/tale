import { useInput } from "../../lib/input.js";
import { Action } from "../../lib/mouse.js";
import { Node } from "./node.js";
import { Style } from "./style.js";
/**@import EventManager from "../../ecs/Event.js";*/
/**@import { BorderType } from "../../rendering/shaders/border";*/
/**@import {HexColor} from "../../rendering/rendering/canvas.js" */

/**
 * @template {{}} T
 * @typedef {{ x: number, y: number, target: Node, ref: Ref<T> }} SpatialEvent
 */
/**
 * @template {{}} T
 * @typedef {{ target: Node, ref: Ref<T> }} Event
 */
/**
 * @template {{}} T
 * @typedef {{ key: string, target: Node, ref: Ref<T> }} KeyEvent
 */
/**
 * @template {{}} T
 * @typedef {{ 
 *    setState(transition: (state: Partial<Props<T>>) => Partial<T>): void, 
 *    state: T,
 *    root: Node,
 * }} Ref
 */
/**
 * 
 * @template {{}} T
 * @typedef {{
 *    [x in keyof T]?: T[x] extends Object ? Part<T[x]>: T[x]
 * }} Part
 */
/**
 * @typedef {Part<{a: 3}>} x
 */
/**
 * @template {{}} T
 * @typedef {{ 
 *    onClick: (ev: SpatialEvent<Props<T>>) => void, 
 *    onClickReleased: (ev: SpatialEvent<Props<T>>) => void, 
 *    onHover: (ev: SpatialEvent<Props<T>>) => void, 
 *    onMouseLeft: (ev: SpatialEvent<Props<T>>) => void, 
 *    onDrag: (ev: SpatialEvent<Props<T>>) => void,
 *    onDrop: (ev: SpatialEvent<Props<T>>) => void,
 *    onKeyDown: (ev: KeyEvent<Props<T>>) => void,
 *    ref: Ref<Props<T>>,
 *    style: Part<Style>
 * } & T} Props
 */

/**
 * @template T
 * @returns {Ref<T>}
 */
export const useRef = () => ({ setState: null, state: null, root: null });
/**
 * 
 * @param {{}} base 
 * @param {{}} extra 
 */
const mergeProps = (base, extra) => {
      for (const [k,v] of Object.entries(extra)) {
            if (k in base) {
                  if (v && typeof v == 'object' && base[k] && typeof base[k] == 'object') {
                        mergeProps(base[k], v);
                  } else {
                        base[k] = v;
                  }
            }
      }
}
/**
 * @template {{}} T
 * @param {Node} node
 * @param {Partial<Props<T>>} props 
 */
function setProps(node, props) {
      if (!props.style) {
            return node;
      }
      mergeProps(node.style, props.style);
      return node;
}

/**
 * @template T
 * @param {EventManager<string>} handler 
 * @param {Action} event 
 * @param {Node} node 
 * @param {Ref<Props<T>>} ref
 * @param {(ev: SpatialEvent<Props<T>>) => void | undefined} onEnter 
* @param {(ev: SpatialEvent<Props<T>>) => void | undefined} onRelease 
 */
function setEvent(event, node, ref, handler, onEnter, onRelease, delta = 0) {
      if (!onEnter && !onRelease) {
            return [];
      }

      handler.on(event, ev => {
            const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
            const {x,y} = data;
            if (node.contains(x, y, delta)) {
                  if (data.released) {
                        onRelease?.({...data, target: node, ref });
                  } else {
                        onEnter?.({...data, target: node, ref });
                  }
            }
      });
      return [    
            /**@param {Node} next */
            next => (node = next)
      ]
}
/**
 * @template {{}} T
 * @param {(props: Partial<Props<T>>, ...children: Node[]) => Node} factory
 */
export function createComponent(factory) {
      
      /**
       * @param {Partial<Props<T>>} props
       * @param {(Node|string)[]} children
       */
      return (props, ...children) => {
            const events = useInput().events;
            /**@type {Array<(node: Node) => void>} */
            const setters = [];
            //@ts-ignore
            props.ref ??= useRef();
            /**@type {Ref<Props<T>>} */
            let ref = props.ref;
            let area = factory(
                        props, 
                        ...children
                              .map(child => typeof child == 'string' ? 
                                    setProps(Node.Text(child), { style: { color: props.style?.color, backgroundColor: 'none' }}): 
                                    child
                              )
                  );
            
            setProps(area, props);


            ref.root = area;
            ref.setState = transition => {
                  ref.state = { ...ref.state, ...transition(ref.state) };
                  const replace = factory(
                        ref.state, 
                        ...children
                              .map(child => typeof child == 'string' ? 
                                    setProps(Node.Text(child), { style: { color: props.style?.color, backgroundColor: 'none' }}): 
                                    child
                              )
                  );
                  if (!area.parent) {
                        throw new Error('cannot change state of immutable root element');
                  }
                  area.parent.replaceChild(area, replace);
                  area = replace;
                  ref.root = replace;
                  setProps(replace, ref.state);

                  for (const setter of setters) {
                        setter(replace);
                  }
            }
            //@ts-ignore
            ref.state = props;

            setters.push(
                  ...setEvent(Action.Click, area, ref, events, props.onClick, props.onClickReleased), 
                  ...setEvent(Action.Hover, area, ref, events, props.onHover, props.onMouseLeft),
                  ...setEvent(Action.Drag, area, ref, events, props.onDrag, props.onDrop, -2),
            );
            if (props.onKeyDown) {
                  events.on("keydown", ev => {
                        const data = /**@type {{ key: string }}*/(ev.data);
                        props.onKeyDown?.({ ...data, target: area, ref });
                  });
            }
            return area;
      }
}

export const Div = createComponent((props, ...children) => {
      const node = new Node();
      node.append(...children);
      return node;
});
