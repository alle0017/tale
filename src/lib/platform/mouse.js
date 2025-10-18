const PREFIX = 'Mouse';
/**
 * @enum {string}
 */
export const Action = {
      SwipeUp: 'swipeUp',
      SwipeDown: 'swipeDown',
      Click: 'click',
      MiddleClick: 'middleClick',
      RightClick: 'rightClick',
      Hover: 'hover',
      Drag: 'drag',
      MiddleDrag: 'middleDrag',
      RightDrag: 'rightDrag',
}
/**
 * 
 * @param {Action} action 
 * @param {number} x 
 * @param {number} y 
 */
export function buildMouseString(action, x, y) {
      return `${PREFIX}[${action},${x},${y}]`
}

/**
 * 
 * @param {string} key 
 */
export function isMouseString(key) {
      for (let i = 0; i < PREFIX.length; i++) {
            if (key[i] !== PREFIX[i]) {
                  return false;
            }
      }

      if (key[PREFIX.length] !== '[' || key[key.length - 1] !== ']') {
            return false;
      }
      return true;
}

/**
 * 
 * @param {string} key 
 * @returns {{ x: number, y: number, action: Action }}
 */
export function getEvent(key) {
      if (key.length < PREFIX.length) {
            throw new Error('invalid mouse event');
      }

      const len = key.length - 1;

      let i = PREFIX.length + 1;
      let action = '';
      let x = 0;
      let y = 0;

      while (i < len && key[i] !== ',') {
            action += key[i];
            i++;
      }
      i++;
      while (i < len && key[i] !== ',') {
            //@ts-ignore
            x = x * 10 + (key[i] - '0')
            i++;
      }
      i++;
      while (i < len) {
            //@ts-ignore
            y = y * 10 + (key[i] - '0')
            i++;
      }
      return {
            action, 
            x, 
            y
      }
}
