import { useInput } from "../lib/input.js";
import { Action } from "../lib/mouse.js";
import { Area } from "../rendering/shaders/area.js";
/**@import { BorderType } from "../rendering/shaders/border";*/

/**
 * @typedef {{ x: number, y: number, target: Area }} Event
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
 * @template {Props} T
 * @param {(props: Partial<T>, ...children: Area[]) => Area} factory
 */
export function createComponent(factory) {
      /**
       * @param {Partial<T>} props
       * @param {(Area|string)[]} children
       */
      return (props, ...children) => {
            const area = factory(
                        props, 
                        ...children
                              .map(child => typeof child == 'string' ? 
                                    text(child): 
                                    child
                              )
                  );
            const events = useInput().events;

            area.resize(props.width ?? area.width, props.height ?? area.height);

            area.border.label = props.label ?? area.border.label;
            area.border.style = props.border ?? area.border.style;

            area.x = props.left ?? area.x;
            area.y = props.top ?? area.y;

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