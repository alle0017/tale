import EventManager from "../ecs/Event.js";
import { useInput } from "../lib/input.js";
import { Layout } from "../lib/layout.js";
import { Action } from "../lib/mouse.js";
import { Area } from "../rendering/shaders/area.js";
import { Parent } from "../rendering/shaders/layout/parent.js";
/**@import { BorderType } from "../rendering/shaders/border";*/

/**
 * @typedef {{ x: number, y: number, target: Area }} Event
 */
/**
 * @template {{}} T
 * @typedef {{ 
 *    setState(transition: (state: Partial<Props & T>) => Partial<Props & T>): void, 
 *    state: Props & T
 * }} Ref
 */
/**
 * @typedef {{ 
 *    onClick: (ev: Event) => void, 
 *    onClickReleased: (ev: Event) => void, 
 *    onHover: (ev: Event) => void, 
 *    onMouseLeft: (ev: Event) => void, 
 *    onDrag: (ev: Event) => void,
 *    onDrop: (ev: Event) => void,
 *    width: number,
 *    height: number,
 *    maxWidth: number,
 *    maxHeight: number,
 *    label: string,
 *    border: BorderType,
 *    left: number,
 *    top: number,
 *    ref: Ref<{}>,
 * }} Props
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
 * 
 * @param {Area} root 
 * @param {Area} area 
 * @param {Area} replace 
 * @returns {boolean}
 */
function replaceNode(root, area, replace) {
      if (!(root instanceof Parent)) {
            return false;
      }

      for (let i = 0; i < root.children.length; i++) {
            if (root.children[i] === area) {
                  root.children[i] = replace;
                  return true;
            }

            const found = replaceNode(root.children[i], area, replace);

            if (found) {
                  return true;
            }
      }

      return false;
}
/**
 * @template {Props} T
 * @param {(props: Partial<T>, ...children: Area[]) => Area} factory
 */
export function createComponent(factory) {
      /**
       * 
       * @param {Area} area 
       * @param {Partial<T>} props 
       */
      function setProps(area, props) {
            area.resize(props.width ?? area.width, props.height ?? area.height);

            area.border.label = props.label ?? area.border.label;
            area.border.style = props.border ?? area.border.style;

            area.x = props.left ?? area.x;
            area.y = props.top ?? area.y;
      }
      /**
       * @param {Partial<T>} props
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
            
            if (props.ref) {
                  props.ref.setState = (transition) => {
                        const children = 'children' in area? area.children: [];
                        //@ts-ignore
                        props.ref.state = transition(props.ref.state);
                        const replace = factory(
                              //@ts-ignore
                              props.ref.state, 
                              //@ts-ignore
                              ...children
                        );
                        const layouts = Layout.getAll();

                        for (let i = 0; i < layouts.length; i++) {
                              if (layouts[i] === area) {
                                    Layout.attach(i, replace);
                                    break;
                              }     

                              const found = replaceNode(layouts[i], area, replace);

                              if (found) {
                                    break;
                              }
                        }
                        area = replace;
                        setProps(area, props);
                  };
                  //@ts-ignore
                  props.ref.state = props;
            }
            if (props.onClick || props.onClickReleased) {
                  events.on(Action.Click, ev => {
                        const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                        const {x,y} = data;
            
                        if (area.contains(x,y)) {
                              if (data.released) {
                                    props.onClickReleased?.({...data, target: area });
                              } else {
                                    props.onClick?.({...data, target: area });
                              }
                        }
                  });
            }
      
            if (props.onHover || props.onMouseLeft) {
                  events.on(Action.Hover, ev => {
                        const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                        const {x,y} = data;
            
                        if (area.contains(x,y)) {
                              props.onHover?.({...data, target: area });
                        } else if (area.isNear(x, y)) {
                              props.onMouseLeft?.({...data, target: area });
                        }
                  });
            }
            if (props.onDrag || props.onDrop) {
                  events.on(Action.Drag, ev => {
                        const data = /**@type {{ x: number, y: number, released: boolean }}*/(ev.data);
                        const {x,y} = data;
            
                        if (area.contains(x,y)) {
                              if (data.released) {
                                    props.onDrop?.({...data, target: area });
                              } else {
                                    props.onDrag?.({...data, target: area });
                              }
                        }
                  });
            }
            return area;
      }
}