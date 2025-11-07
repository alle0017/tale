import EventManager from "../ecs/Event.js";
import { useInput } from "../lib/input.js";
import { Layout } from "../lib/layout.js";
import { Action } from "../lib/mouse.js";
import { Area } from "../rendering/shaders/area.js";
import { Parent } from "../rendering/shaders/layout/parent.js";
/**@import { BorderType } from "../rendering/shaders/border";*/

/**
 * @template {{}} T
 * @typedef {{ x: number, y: number, target: Area, ref: Ref<T> }} Event
 */
/**
 * @template {{}} T
 * @typedef {{ 
 *    setState(transition: (state: Partial<Props<T>>) => Partial<T>): void, 
 *    state: T
 * }} Ref
 */
/**
 * @template {{}} T
 * @typedef {{ 
 *    onClick: (ev: Event<Props<T>>) => void, 
 *    onClickReleased: (ev: Event<Props<T>>) => void, 
 *    onHover: (ev: Event<Props<T>>) => void, 
 *    onMouseLeft: (ev: Event<Props<T>>) => void, 
 *    onDrag: (ev: Event<Props<T>>) => void,
 *    onDrop: (ev: Event<Props<T>>) => void,
 *    width: number,
 *    height: number,
 *    maxWidth: number,
 *    maxHeight: number,
 *    label: string,
 *    border: BorderType,
 *    left: number,
 *    top: number,
 *    ref: Ref<Props<T>>,
 * } & T} Props
 */

/**
 * @param {string} str 
 */
const text = str => {
      const area = new Area();
      area.setLine(0,str);
      return area;
}
/**
 * @template T
 * @returns {Ref<T>}
 */
export const useRef = () => ({ setState: null, state: null });

/**
 * @template {{}} T
 * @param {(props: Partial<Props<T>>, ...children: Area[]) => Area} factory
 */
export function createComponent(factory) {
      /**
       * 
       * @param {Area} area 
       * @param {Partial<Props<T>>} props 
       */
      function setProps(area, props) {
            area.resize(props.width ?? area.width, props.height ?? area.height);

            area.border.label = props.label ?? area.border.label;
            area.border.style = props.border ?? area.border.style;

            area.x = props.left ?? area.x;
            area.y = props.top ?? area.y;
      }
      /**
       * @param {Partial<Props<T>>} props
       * @param {(Area|string)[]} children
       */
      return (props, ...children) => {
            const events = useInput().events;
            let area = factory(
                        props, 
                        ...children
                              .map(child => typeof child == 'string' ? 
                                    text(child): 
                                    child
                              )
                  );

            setProps(area, props);
            /**@type {Ref<Props<T>>} */
            let ref = props.ref;
            
            if (!ref) {
                  ref = useRef();
            }

            ref.setState = (transition) => {
                  const children = 'children' in area? area.children: [];
                  //@ts-ignore
                  ref.state = transition(ref.state);
                  const replace = factory(
                        //@ts-ignore
                        ref.state, 
                        //@ts-ignore
                        ...children
                  );
                  if (area.parent) {
                        area.parent.replaceChild(area, replace);
                  } else {
                        const layouts = Layout.getAll();
                        for (let i = 0; i < layouts.length; i++) {
                              if (layouts[i] === area) {
                                    Layout.attach(i, replace);
                                    break;
                              }  
                        }
                  }
                  area = replace;
                  setProps(area, props);
            };
            //@ts-ignore
            ref.state = props;

            if (props.onClick || props.onClickReleased) {
                  events.on(Action.Click, ev => {
                        const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                        const {x,y} = data;
            
                        if (area.contains(x,y)) {
                              if (data.released) {
                                    props.onClickReleased?.({...data, target: area, ref });
                              } else {
                                    props.onClick?.({...data, target: area, ref });
                              }
                        }
                  });
            }
      
            if (props.onHover || props.onMouseLeft) {
                  events.on(Action.Hover, ev => {
                        const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                        const {x,y} = data;
            
                        if (area.contains(x,y)) {
                              props.onHover?.({...data, target: area, ref });
                        } else if (area.isNear(x, y)) {
                              props.onMouseLeft?.({...data, target: area, ref });
                        }
                  });
            }
            if (props.onDrag || props.onDrop) {
                  events.on(Action.Drag, ev => {
                        const data = /**@type {{ x: number, y: number, released: boolean, }}*/(ev.data);
                        const {x,y} = data;
            
                        if (area.contains(x,y)) {
                              if (data.released) {
                                    props.onDrop?.({...data, target: area, ref });
                              } else {
                                    props.onDrag?.({...data, target: area, ref });
                              }
                        }
                  });
            }
            return area;
      }
}